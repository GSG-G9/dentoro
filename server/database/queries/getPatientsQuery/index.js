const connection = require('../../config/connection');

const getPatientsQuery = () => {
  const sql = {
    text: 'SELECT * FROM patients ORDER BY id ASC',
  };
  return connection.query(sql);
};

module.exports = getPatientsQuery;
