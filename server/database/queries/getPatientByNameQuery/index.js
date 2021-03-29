const connection = require('../../config/connection');

const getPatientByNameQuery = ({ firstName = '', lastName = '' }) => {
  const sql = {
    text: 'SELECT * FROM patients WHERE firstname=$1 or lastname=$2',
    values: [firstName, lastName],
  };
  return connection.query(sql);
};

module.exports = getPatientByNameQuery;
