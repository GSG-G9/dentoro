const connection = require('../../config/connection');

module.exports = (phone) => {
  const sql = {
    text: 'SELECT * FROM patients WHERE phone=$1;',
    values: [phone],
  };
  return connection.query(sql);
};
