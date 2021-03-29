const { getPatientsQuery } = require('../../database/queries');

const getPatients = async (req, res, next) => {
  try {
    const { rows: data } = await getPatientsQuery();
    res.json({ statusCode: 200, data });
  } catch (error) {
    next(error);
  }
};

module.exports = getPatients;
