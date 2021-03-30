const connection = require('../../config/connection');

const getPatientsQuery = () => {
  const sql = {
    text: 'SELECT * FROM patients',
  };
  return connection.query(sql);
};

module.exports = getPatientsQuery;
