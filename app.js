const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const {Server} = require('socket.io')
const io = new Server(server)
let online = ''
let onlineCount = 0


app.set('view engine', 'ejs')
app.use(express.static('public'))


const port =  process.env.PORT || 3000

io.on('connection' , (server) => {
    online = `A user is online`
    onlineCount++
    server.on('chat message', (msg) => {
        console.log(`'message: ${msg}`)
        io.emit('chat message', msg);
    })
})

app.get('/', (req, res) => {
    res.render('index', {
        online: online,
        onlineCount: onlineCount
    })
})

server.listen(port, () => {
    console.log(`Listening on port ${port}`)
})