/* eslint-disable no-console */
const connection = require('./connection');
const dbBuild = require('./build');

(async () => {
  try {
    await dbBuild();
    console.log('Build Successfully');
    const { rows } = await connection.query('SELECT * from appointments');
    console.log(rows);
    connection.end();
  } catch (e) {
    console.log('Build Failed', e);
  }
})();

module.exports = {
  connection,
  dbBuild,
};
