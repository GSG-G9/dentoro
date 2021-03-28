const express = require('express');

const app = express();

const { clientError, serverError } = require('./middlewares');

app.use(clientError);
app.use(serverError);
