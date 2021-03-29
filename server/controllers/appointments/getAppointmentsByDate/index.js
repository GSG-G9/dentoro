const { getAppointmentsByDateQuery } = require('../../../database/queries');
const { appointmentDateValidation, boomify } = require('../../../utils');

const getAppointmentsByDate = async (req, res, next) => {
  try {
    const { appointmentDate } = req.params;

    const isValid = await appointmentDateValidation.isValid({
      appointmentDate,
    });
    if (!isValid) {
      return next(boomify(400, 'Invalid Date', 'Please send a correct date'));
    }
    const { rows } = await getAppointmentsByDateQuery(appointmentDate);
    return res.json({ statusCode: 200, message: 'success', data: rows });
  } catch (err) {
    return next(err);
  }
};

module.exports = getAppointmentsByDate;
