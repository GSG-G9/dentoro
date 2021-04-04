const connection = require('../../config/connection');

const updateAppointmentStatusQuery = ({ appointmentId }) => {
  const sql = {
    text:
      'UPDATE appointments SET is_done = true WHERE id = $1 AND is_done = false RETURNING is_done',
    values: [appointmentId],
  };
  return connection.query(sql);
};

module.exports = updateAppointmentStatusQuery;
