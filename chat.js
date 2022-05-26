const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('syle', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {   //ouvindo se alguém se mandou mensagem
    socket.usuario = 'Convidado'
    socket.on('mensagem', (msg) => io.emit('mensagem', { 'usuario': socket.usuario, 'mensagem': msg }))
    socket.on('join', (usuario) => {
        if(usuario != null){
            socket.usuario = usuario
        } 
        socket.broadcast.emit('mensagem', { usuario: 'servidor', 'mensagem': socket.usuario + ' entrou no chat!' } )
    })
})

http.listen(3000, () => console.log('Ouvindo na porta 3000'))