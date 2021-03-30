const connection = require('../../config/connection');

const getPatientByNameOrPhoneQuery = ({
  firstName = '',
  lastName = '',
  phone = '',
}) => {
  const sql = {
    text:
      'SELECT * FROM patients WHERE firstname ILIKE $1 OR lastname ILIKE $2 OR phone = $3',
    values: [firstName, lastName, phone],
  };
  return connection.query(sql);
};

module.exports = getPatientByNameOrPhoneQuery;
