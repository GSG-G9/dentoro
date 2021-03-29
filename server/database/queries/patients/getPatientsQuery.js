const { connection } = require('../../config/index');

const getPatientsQuery = () => {
  const sql = {
    text: 'SELECT * FROM patients',
  };
  return connection.query(sql);
};

module.exports = getPatientsQuery;
