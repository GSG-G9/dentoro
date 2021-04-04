const connection = require('../../config/connection');

const getUserDataQeury = ({ userId }) => {
  const sql = {
    text: 'SELECT id, email FROM users WHERE id = $1',
    values: [userId],
  };
  return connection.query(sql);
};

module.exports = getUserDataQeury;
