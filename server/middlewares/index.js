const { clientError, serverError } = require('./errorHandle');
const isAuth = require('./auth');

module.exports = {
  clientError,
  serverError,
  isAuth,
};
