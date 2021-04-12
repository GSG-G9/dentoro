const connection = require('../../config/connection');

const getAppointmentsByDateQuery = (date) => {
  const sql = {
    text:
      "SELECT appointments.id as appointment_id ,* FROM appointments INNER JOIN patients on appointments.patient_id = patients.id WHERE to_char(appointment_date,'YYYY-MM-DD') = $1",
    values: [date],
  };
  return connection.query(sql);
};

module.exports = getAppointmentsByDateQuery;
