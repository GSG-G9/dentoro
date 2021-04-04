const jwt = require('jsonwebtoken');

const sign = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_TOKEN, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });

module.exports = { sign };
