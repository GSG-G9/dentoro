const connection = require('../../config/connection');

const checkPatientExistence = ({ phone }) => {
  const sql = {
    text: 'SELECT id FROM patients WHERE phone = $1',
    values: [phone],
  };
  return connection.query(sql);
};

module.exports = checkPatientExistence;
