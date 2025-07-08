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

server.post('/action',(req,res)=>{
    if(req.body.action === 'joke'){
        res.end('sucess')
    }
    else{
        res.end('hgd')
    }
})

server.listen(PORT,()=>console.log(`server listening on port ${PORT}`))