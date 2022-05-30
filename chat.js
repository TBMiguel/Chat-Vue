const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.use('syle', express.static(__dirname + '/style'))
app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

io.on('connection', (socket) => {
    const count = io.engine.clientsCount;
    console.log("Quantidade de conexões: " + count)
    socket.on('mensagem', (msg) => io.emit('mensagem', { 'usuario': socket.usuario, 'mensagem': msg }))

    socket.on('join', (usuario) => {
        if(usuario != null){
            socket.usuario = usuario

            function imprimir(user) {
                user.forEach((user => {
                    console.log(user);
                    io.emit('users', socket.usuario ) //emitindo usuarios
                }))
            }

            usuarios = [socket.usuario]
        
            imprimir(usuarios)
        }
        socket.broadcast.emit('mensagem', { usuario: 'servidor', 'mensagem': socket.usuario + ' entrou no chat!' } )
    })

    socket.on('jointo', (destinatario, usuarios) => {
        usuarios.forEach(user => {
            if(user == socket.usuario){
                io.to(socket.id).emit('newUser');
            }
        })
    })

    // socket.on('disconnect', () => {
    //    socket.broadcast.emit('mensagem', { usuario: 'servidor', 'mensagem': socket.usuario + ' saiu do chat!' } )
    //})
})

http.listen(3000, () => console.log('Ouvindo na porta 3000'))