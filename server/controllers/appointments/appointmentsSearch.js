const { getAppointmentsByPatientName } = require('../../database/queries');
const { appointmentsSearchSchema } = require('../../utils/validation');
const { boomify } = require('../../utils');

const appointmentsSearch = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phone,
    } = await appointmentsSearchSchema.validate(req.query, {
      abortEarly: false,
    });

    if (firstName || lastName || phone) {
      const { rows: data } = await getAppointmentsByPatientName({
        firstName,
        lastName,
        phone,
      });
      res.json({
        StatusCode: 200,
        data,
      });
    } else {
      next(
        boomify(400, 'Validation Error', 'Enter the name or the phone number'),
      );
    }
  } catch (error) {
    next(
      error.name === 'ValidationError'
        ? boomify(400, 'Validation Error', error.errors)
        : error,
    );
  }
};

module.exports = appointmentsSearch;
