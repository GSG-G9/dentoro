const { deleteAppointmentsQueries } = require('../../database/queries');
// const { boomify } = require('../../utils');

const deleteAppointments = async (req, res, next) => {
  try {
    const { patientId, appointmentId } = req.params;

    const { rows } = await deleteAppointmentsQueries(patientId, appointmentId);
    return res.json({
      statusCode: 200,
      message: 'appointment deleted successfully',
      data: rows,
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = deleteAppointments;
