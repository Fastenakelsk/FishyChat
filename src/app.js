const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const {
  newUserConnection,
  userDisconnect,
  sendMessage,
  changeNickname,
} = require('./helper');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  socket.person = { id: socket.id, nickname: socket.id };
  // Change nickname
  socket.on('change nickname', (nickname) => {
    socket.person.nickname = nickname;
    changeNickname(io, socket.person);
  });
  socket.on('chat message', (messsage) => {
    sendMessage(io, socket.person, messsage);
  });
  newUserConnection(io, socket.person);
  socket.on('disconnect', () => {
    userDisconnect(io, socket.person);
  });
});

http.listen(3000, () => {
  console.log('listening on 127.0.0.1:3000');
});
