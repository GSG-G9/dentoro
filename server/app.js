require('dotenv').config();

const express = require('express');
const { join } = require('path');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const { clientError, serverError } = require('./middlewares');

const {
  env: { PORT, NODE_ENV },
} = process;

const router = require('./routes');

const app = express();

app.set('port', PORT || 5000);

const middlewares = [
  compression(),
  cookieParser(),
  express.urlencoded({ extended: false }),
  express.json(),
];

app.use(middlewares);
app.use('/api/v1/', router);

app.use(clientError);
app.use(serverError);

if (NODE_ENV === 'development') {
  app.get('/', (req, res) => {
    res.json({ message: 'server running' });
  });
}
if (NODE_ENV === 'production') {
  app.use(express.static(join(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.use(clientError);
app.use(serverError);

module.exports = app;
