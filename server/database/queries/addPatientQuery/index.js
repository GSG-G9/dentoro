const connection = require('../../config/connection');

const addPatientQuery = ({
  firstName,
  lastName,
  email,
  birthday,
  phone,
  diseases,
}) => {
  const sql = {
    text:
      'INSERT INTO patients(firstname,lastname,email,birthday,phone,diseases) VALUES($1,$2,$3,$4,$5,$6) RETURNING id',
    values: [firstName, lastName, email, birthday, phone, diseases],
  };
  return connection.query(sql);
};
module.exports = addPatientQuery;
