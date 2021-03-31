const connection = require('../../config/connection');

const getHistoryLogs = ({ patientId }) => {
  const sql = {
    text:
      'SELECT price, payment, description, log_date FROM history where patient_id = $1 ',
    values: [patientId],
  };
  return connection.query(sql);
};

module.exports = getHistoryLogs;
