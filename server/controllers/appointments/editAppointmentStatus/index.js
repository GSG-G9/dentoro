const { boomify, appointmentIdValidation } = require('../../../utils');

const {
  updateAppointmentStatusQuery,
  getAppointmentsStatusByIdQuery,
} = require('../../../database/queries');

const editAppointmentStatus = async (req, res, next) => {
  try {
    const { appointmentId } = await appointmentIdValidation.validate(
      req.params,
    );

    const {
      rows: appointmentById,
      rowCount: isAppointmentExist,
    } = await getAppointmentsStatusByIdQuery({
      appointmentId,
    });

    if (!isAppointmentExist) {
      return next(
        boomify(400, 'Invalid Appointment id', 'This appointment is not exist'),
      );
    }
    const { is_done: isAppointmentDone } = appointmentById[0];

    if (isAppointmentDone) {
      return next(
        boomify(400, 'Closed Appointment', 'This appointment is completed'),
      );
    }
    await updateAppointmentStatusQuery({
      appointmentId,
    });
    return res.json({
      status: 200,
      message: 'success',
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(boomify(400, 'Validation Error', err.errors));
    }
    return next(err);
  }
};

module.exports = editAppointmentStatus;
