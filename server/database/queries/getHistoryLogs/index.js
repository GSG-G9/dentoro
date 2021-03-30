const connection = require('../../config/connection');

const getHistoryLogs = ({ patientId }) => {
  const sql = {
    text:
      'SELECT history.price, history.payment, history.description, appointments.appointment_date FROM history INNER JOIN appointments ON appointments.id = history.appointment_id AND appointments.patient_id = $1 AND is_done = true;',
    values: [patientId],
  };
  return connection.query(sql);
};

module.exports = getHistoryLogs;
