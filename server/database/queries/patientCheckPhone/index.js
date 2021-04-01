const connection = require('../../config/connection');

const patientCheckPhone = ({ phone }) => {
  const sql = {
    text: 'SELECT * FROM patients WHERE phone = $1',
    values: [phone],
  };
  return connection.query(sql);
};

module.exports = patientCheckPhone;