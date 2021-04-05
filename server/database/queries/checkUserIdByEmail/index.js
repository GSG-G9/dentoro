const connection = require('../../config/connection');

const checkUserIdByEmail = ({ email }) => {
  const sql = {
    text: 'SELECT id FROM users where email = $1 ;',
    values: [email],
  };
  return connection.query(sql);
};

module.exports = checkUserIdByEmail;
