const connection = require('../../config/connection');

const addAppointmentQuery = ({
  patientId,
  appointmentDate,
  appointmentTime,
  complaints,
}) => {
  const sql = {
    text:
      'INSERT INTO appointments(patient_id,appointment_date,appointment_time,complaints) VALUES($1,$2,$3,$4) RETURNING id',
    values: [patientId, appointmentDate, appointmentTime, complaints],
  };
  return connection.query(sql);
};
module.exports = addAppointmentQuery;
