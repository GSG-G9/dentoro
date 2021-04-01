const { getAppointmentsByDateQuery } = require('../../database/queries');
const { appointmentDateValidation, boomify } = require('../../utils');

const getAppointmentsByDate = async (req, res, next) => {
  try {
    const { appointmentDate } = await appointmentDateValidation.validate(
      req.params,
    );
    const { rows } = await getAppointmentsByDateQuery(appointmentDate);
    return res.json({ statusCode: 200, message: 'success', data: rows });
  } catch (err) {
    return next(
      err.name === 'RangeError'
        ? boomify(400, 'Invalid Date', 'Please send a correct date')
        : err,
    );
  }
};

module.exports = getAppointmentsByDate;
