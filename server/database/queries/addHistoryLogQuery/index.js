const connection = require('../../config/connection');

const addHistoryLogQuery = ({ patientId, description, price, payment }) => {
  const sql = {
    text:
      'INSERT INTO history(patient_id,description,price,payment) VALUES($1,$2,$3,$4) RETURNING id,patient_id,description,price,payment,log_date::timestamp::date ;',
    values: [patientId, description, price, payment],
  };
  return connection.query(sql);
};

module.exports = addHistoryLogQuery;
