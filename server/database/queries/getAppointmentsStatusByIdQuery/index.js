const connection = require('../../config/connection');

const getAppointmentsStatusByIdQuery = ({ appointmentId }) => {
  const sql = {
    text: 'SELECT is_done FROM appointments WHERE id = $1',
    values: [appointmentId],
  };
  return connection.query(sql);
};

module.exports = getAppointmentsStatusByIdQuery;
