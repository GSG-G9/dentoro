const { verify, sign } = require('jsonwebtoken');

const {
  env: { SECRET_TOKEN },
} = process;
const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    verify(token, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
const signToken = (payload) =>
  new Promise((resolve, reject) => {
    sign(payload, SECRET_TOKEN, (err, token) => {
      if (err) {
        return reject(err);
      }
      return resolve(token);
    });
  });

module.exports = { signToken, verifyToken };
