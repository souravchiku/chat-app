const express = require('express')
const app = express()

const PORT = process.env.PORT || 3001

const http = require('http').createServer(app)

http.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})


// for css apply because / route is only rendering index html
// we'll use middleware to over come it

// we are telling that all the static file is in pulbic folder 
app.use(express.static(__dirname+'/public'))


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})

// Socket

const io = require('socket.io')(http)

io.on('connection',(socket)=>{
    console.log('connected')
     socket.on('message',(message)=>{
         socket.broadcast.emit('message',message)
     })
}
    
)