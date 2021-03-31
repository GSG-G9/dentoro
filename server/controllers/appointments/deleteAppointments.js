const { deleteAppointmentsQueries } = require('../../database/queries');
const { appointmentIdValidation, boomify } = require('../../utils');

const deleteAppointments = async (req, res, next) => {
  try {
    const { appointmentId } = await appointmentIdValidation.validate(
      req.params,
    );

    const {
      rows: [appointment],
    } = await deleteAppointmentsQueries(appointmentId);
    if (!appointment) {
      return next(
        boomify(
          400,
          'Bad request',
          'You cannot complete the process at the moment',
        ),
      );
    }

    await deleteAppointmentsQueries(appointmentId);
    return res.json({
      statusCode: 200,
      message: 'appointment deleted successfully',
    });
  } catch (error) {
    return next(
      error.name === 'ValidationError'
        ? boomify(400, 'Validation Error', error.errors)
        : error,
    );
  }
};

module.exports = deleteAppointments;
