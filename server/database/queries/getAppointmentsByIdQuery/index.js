const connection = require('../../config/connection');

const getAppointmentsByIdQuery = ({ appointmentId }) => {
  const sql = {
    text: 'SELECT id, is_done FROM appointments WHERE id = $1',
    values: [appointmentId],
  };
  return connection.query(sql);
};

module.exports = getAppointmentsByIdQuery;
