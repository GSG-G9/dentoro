const { deleteAppointmentsQueries } = require('../../database/queries');

const deleteAppointments = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;

    await deleteAppointmentsQueries(appointmentId);
    return res.json({
      statusCode: 200,
      message: 'appointment deleted successfully',
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAppointments;
