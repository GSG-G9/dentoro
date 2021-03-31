const connection = require('../../config/connection');

const deleteAppointmentsQueries = (appointmentId) => {
  const sql = {
    text:
      'DELETE FROM appointments WHERE id = $1 AND is_done =false RETURNING *',
    values: [appointmentId],
  };
  return connection.query(sql);
};

module.exports = deleteAppointmentsQueries;
