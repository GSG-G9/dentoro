const connection = require('../../config/connection');

const getPatientProfileData = ({ patientId }) => {
  const sql = {
    text: 'SELECT * FROM patients where id = $1 ;',
    values: [patientId],
  };
  return connection.query(sql);
};

module.exports = getPatientProfileData;
