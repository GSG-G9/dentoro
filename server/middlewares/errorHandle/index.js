const { boomify } = require('../../utils');

const clientError = (req, res) => {
  const errorMessage = boomify(404, 'Not Found', 'The page is not found');
  res.status(404).json(errorMessage);
};

// eslint-disable-next-line no-unused-vars
const serverError = (err, req, res, next) => {
  const errorMessage = err.statusCode
    ? err
    : boomify(500, 'Internal Server Error', 'Something went wrong');

  res.status(err.statusCode || 500).json(errorMessage);
};

module.exports = { clientError, serverError };
