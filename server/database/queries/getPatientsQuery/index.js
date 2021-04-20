const connection = require('../../config/connection');

const getPatientsQuery = () => {
  const sql = {
    text: 'SELECT * FROM patients ORDER By ID DESC',
  };
  return connection.query(sql);
};

module.exports = getPatientsQuery;
