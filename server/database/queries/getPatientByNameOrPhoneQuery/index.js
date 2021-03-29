const connection = require('../../config/connection');

const getPatientByNameOrPhoneQuery = ({
  firstName = '',
  lastName = '',
  phone = '',
}) => {
  const sql = {
    text:
      'SELECT * FROM patients WHERE firstname ilike $1 or lastname ilike $2 or phone = $3',
    values: [firstName, lastName, phone],
  };
  return connection.query(sql);
};

module.exports = getPatientByNameOrPhoneQuery;
