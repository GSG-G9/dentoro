const connection = require('../../config/connection');

const getAppointmentsByPatientName = (firstName, lastName, phone) => {
  const sql = {
    text:
      'SELECT appointments.id,appointments.appointment_date,appointments.appointment_time,patients.firstname,patients.lastname FROM appointments INNER JOIN patients ON patients.id = appointments.patient_id where appointments.is_done =false AND patients.firstname=$1 AND patients.lastname=$2 OR (patients.phone=$3 AND appointments.is_done =false);',
    values: [firstName, lastName, phone],
  };
  return connection.query(sql);
};

module.exports = getAppointmentsByPatientName;
