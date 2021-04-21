const socketIO = require('socket.io');
const http = require('http');

const app = require('./app');

const port = app.get('port');

const server = http.createServer(app);

const io = socketIO(server);
io.on('connection', (socket) => {
  socket.on('add appointment', (value) => {
    if (new Date(value).toDateString() === new Date().toDateString()) {
      io.sockets.emit('updateAppointments');
    }
  });
});
// eslint-disable-next-line no-console
server.listen(port, () => console.log(`http://localhost:${port}`));
