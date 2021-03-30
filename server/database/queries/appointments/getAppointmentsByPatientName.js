const connection = require('../../config/connection');

const getAppointmentsByPatientName = ({ firstName, lastName, phone }) => {
  const sql = {
    text:
      'SELECT appointments.id,appointments.appointment_date,appointments.appointment_time,patients.firstname,patients.lastname FROM appointments INNER JOIN patients ON patients.id = appointments.patient_id WHERE appointments.is_done =false AND (patients.firstname ILIKE $1 OR patients.lastname ILIKE $2 OR patients.phone= $3);',
    values: [firstName, lastName, phone],
  };
  return connection.query(sql);
};

module.exports = getAppointmentsByPatientName;
