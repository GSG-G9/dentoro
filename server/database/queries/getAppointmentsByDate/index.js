const connection = require('../../config/connection');

module.exports = (date) => {
  const sql = {
    text:
      'SELECT appointments.id as appointments_id ,* FROM appointments INNER JOIN patients on appointments.patient_id = patients.id WHERE appointment_date = $1',
    values: [date],
  };
  return connection.query(sql);
};
