const connection = require('../../config/connection');

const getPatientByPhoneQuery = (phone) => {
  const sql = {
    text: 'SELECT * FROM patients WHERE phone=$1;',
    values: [phone],
  };
  return connection.query(sql);
};

module.exports = getPatientByPhoneQuery;
