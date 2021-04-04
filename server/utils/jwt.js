const { verify } = require('jsonwebtoken');

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
module.exports = { verifyToken };
