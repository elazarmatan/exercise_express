import expres from 'express'

const PORT = 2027

const server = expres()

function logger(req,res,next){
    console.log(req.method,req.url)
    next()
}

server.use(expres.json())
server.use(logger)
//GETS==============================================================================
server.get('/greet/:name',(req,res)=>{
    res.json({"msg":`got from ${req.params.name}`})
})

server.get('/test',(req,res) =>{
    fetch('http://localhost:2027/greet/elazar')
    .then(response => response.json())
    .then(data => {
        if(data.msg === 'got from elazar'){
            res.end('ok')
        }
        else{
            res.end('not ok')
        }
    })
})



server.get('/greet',(req,res)=>{
    res.json({
            "msg":"hi from get endpoint",
           "time": new Date().toLocaleTimeString()})
})



//POSTS-------------------------------------------------------------------------------------------

const X_API_KEY = 'live_fEWiKXGOrJxE9rG4ES9KKWFVyfsIryH1hnWA6vfwrtEqesiUqupKSj6Quf10TDps'

server.post('/action',async (req,res)=>{
    if(req.body.action === 'joke'){
        const response = await fetch('https://official-joke-api.appspot.com/random_joke')
        const data = await response.json()
        const fullJoke = `${data.setup} ${data.punchline}`
        res.json({"joke":fullJoke})
    }
    else if(req.body.action === 'cat fact'){
        const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=11',{headers:{
            'x-api-key':X_API_KEY
        }})
        const data = await response.json()
        res.json({"length":data.length})
    }
    else{
        res.status(400)
        res.json({ "msg": "body is malformed" })
    }
})

server.listen(PORT,()=>console.log(`server listening on port ${PORT}`))