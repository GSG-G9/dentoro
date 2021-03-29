const connection = require('../../config/connection');

module.exports = ({ firstName = '', lastName = '' }) => {
  const sql = {
    text: 'SELECT * FROM patients WHERE firstname=$1 or lastname=$2',
    values: [firstName, lastName],
  };
  return connection.query(sql);
};
