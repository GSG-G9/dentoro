const connection = require('../../config/connection');

const getUserDataQeury = ({ email }) => {
  const sql = {
    text: 'SELECT id, email, password FROM users WHERE email = $1',
    values: [email],
  };
  return connection.query(sql);
};

module.exports = getUserDataQeury;
