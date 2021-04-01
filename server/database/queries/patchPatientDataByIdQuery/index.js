const connection = require('../../config/connection');

const patchPatientDataByIdQuery = (
  firstName,
  lastName,
  phone,
  email,
  birthday,
  diseases,
  patientId,
) => {
  const sql = {
    text:
      'UPDATE patients SET firstname =$1, lastname = $2, phone = $3, email = $4, birthday = $5, diseases= $6 WHERE id = $7 RETURNING *',
    values: [firstName, lastName, phone, email, birthday, diseases, patientId],
  };
  return connection.query(sql);
};

module.exports = patchPatientDataByIdQuery;
