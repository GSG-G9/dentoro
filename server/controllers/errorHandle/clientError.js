const boom = require('@hapi/boom');

const clientError = (req, res, next) => {
  next(boom.notFound());
};

module.exports = clientError;
