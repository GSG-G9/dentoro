const connection = require('../../config/connection');

const addUserQuery = ({ email, password }) => {
  const sql = {
    text: 'INSERT INTO users ( email,  password ) values($1 ,$2) returning id',
    values: [email, password],
  };
  return connection.query(sql);
};

module.exports = addUserQuery;
