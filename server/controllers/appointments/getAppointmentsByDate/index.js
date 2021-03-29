const { getAppointmentsByDateQuery } = require('../../../database/queries');
const { appointmentDateValidation, boomify } = require('../../../utils');

const getAppointmentsByDate = async (req, res, next) => {
  try {
    const { appointmentDate } = req.params;

    const isValid = await appointmentDateValidation.isValid({
      appointmentDate,
    });
    if (!isValid) {
      throw boomify(400, 'Invalid Date', 'Please send a correct date');
    }
    const { rows } = await getAppointmentsByDateQuery(appointmentDate);
    res.json({ statusCode: 200, message: 'success', data: rows });
  } catch (err) {
    next(err);
  }
};

module.exports = getAppointmentsByDate;
