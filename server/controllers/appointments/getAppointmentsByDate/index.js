const { getAppointmentsByDate } = require('../../../database/queries');
const { appointmentDateValidation, boomify } = require('../../../utils');

module.exports = async (req, res, next) => {
  try {
    const { appointmentDate } = req.params;

    const isValid = await appointmentDateValidation.isValid({
      appointmentDate,
    });
    if (!isValid) {
      throw boomify(400, 'Invalid Date', 'Please send a correct date');
    }
    const { rows } = await getAppointmentsByDate(appointmentDate);
    res.json({ status: 200, message: 'success', data: rows });
  } catch (err) {
    next(err);
  }
};
