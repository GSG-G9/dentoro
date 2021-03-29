/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const serverError = (err, req, res, next) => {
  console.log('error:', err);

  let { message } = err;
  if (err.isBoom) {
    res.status(err.output.statusCode || 500);
  } else {
    res.status(err.statusCode || 500);
    if (err.statusCode === 500) {
      message = 'Internal Server Error';
    }
  }
  res.json({ error: message });
};

module.exports = serverError;
