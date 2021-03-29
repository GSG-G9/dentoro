/* eslint-disable no-console */
const connection = require('./connection');
const dbBuild = require('./build');

(async () => {
  try {
    await dbBuild();
    console.log('Build Successfully');
    connection.end();
  } catch (e) {
    console.log('Build Failed', e);
  }
})();
