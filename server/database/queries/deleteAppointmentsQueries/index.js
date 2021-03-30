const connection = require('../../config/connection');

const deleteAppointmentsQueries = ({ patientId, appointmentId }) => {
  const sql = {
    text:
      'DELETE FROM appointments WHERE patient_id = (SELECT id FROM patients WHERE id = $1) AND id = $2 RETURNING * ;',
    values: [patientId, appointmentId],
  };
  return connection.query(sql);
};

module.exports = deleteAppointmentsQueries;
