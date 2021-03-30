const moment = require('moment');

const users = [];

const currentTime = () => moment().format('HH:mm:ss');
const updateUsers = (io) => io.emit('update users', users);

const newUserConnection = (io, person) => {
  users.push(person);
  console.log(users);
  io.emit('new connection', users);
  io.emit('chat message', `${currentTime()} | ${person.nickname} has connected`);
};

const userDisconnect = (io, person) => {
  users.splice(users.map((u) => u.nickname).indexOf(person.nickname));
  updateUsers(io);
  io.emit('chat message', `${currentTime()} | ${person.nickname} has disconnected`);
};

const sendMessage = (io, person, message) => {
  io.emit('chat message', `${currentTime()} | ${person.nickname}: ${message}`);
};

const changeNickname = (io, person) => {
  users[users.map((u) => u.id).indexOf(person.id)] = person;
  updateUsers(io);
  io.emit('chat message', `${currentTime()} | User with id: ${person.id} is now known as: ${person.nickname}`);
};

module.exports = {
  newUserConnection,
  userDisconnect,
  sendMessage,
  changeNickname,
};
