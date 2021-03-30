const connection = require('../../config/connection');

const addHistoryLogQuery = ({ appointmentId, description, price, payment }) => {
  const sql = {
    text:
      'INSERT INTO history(appointment_id,description,price,payment) VALUES($1,$2,$3,$4) RETURNING * ;',
    values: [appointmentId, description, price, payment],
  };
  return connection.query(sql);
};

module.exports = addHistoryLogQuery;
