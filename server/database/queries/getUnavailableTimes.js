const connection = require('../config/connection');

const getUnavailableTimes = ({ date }) => {
  const sql = {
    text:
      "SELECT appointment_time FROM appointments WHERE to_char(appointment_date,'YYYY-MM-DD') = $1",
    values: [date],
  };
  return connection.query(sql);
};

module.exports = getUnavailableTimes;
