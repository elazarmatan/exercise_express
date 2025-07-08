import expres from 'express'

const PORT = 2027

const server = expres()

// new Date().toLocaleTimeString()
server.get('/greet',(req,res)=>{
    res.json({
            "msg":"hi from get endpoint",
           "time": new Date().toLocaleTimeString()})
})

server.listen(PORT,()=>console.log(`server listening on port ${PORT}`))