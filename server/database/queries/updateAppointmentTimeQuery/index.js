const connection = require('../../config/connection');

const updateAppointmentTimeQuery = ({
  appointmentId,
  appointmentDate,
  appointmentTime,
}) => {
  const sql = {
    text:
      'UPDATE appointments SET appointment_date=$2, appointment_time=$3 WHERE id=$1 AND is_done = false RETURNING id,appointment_date,appointment_time',
    values: [appointmentId, appointmentDate, appointmentTime],
  };
  return connection.query(sql);
};
module.exports = updateAppointmentTimeQuery;
