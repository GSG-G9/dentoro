const {
  appointmentDateTimeValidation,
  checkAvailableTimes,
  boomify,
  appointmentIdValidation,
} = require('../../../utils');

const {
  getUnavailableTimes,
  updateAppointmentTimeQuery,
  getAppointmentsStatusByIdQuery,
} = require('../../../database/queries');

const editAppointmentTime = async (req, res, next) => {
  try {
    const { appointmentId } = await appointmentIdValidation.validate(
      req.params,
    );
    const {
      appointmentDate,
      appointmentTime,
    } = await appointmentDateTimeValidation.validate(req.body);

    if (!checkAvailableTimes(appointmentTime)) {
      return next(
        boomify(
          400,
          'Unavailable Time',
          'please choose another appointment time through the working hours',
        ),
      );
    }
    const { rows: UnavailableTimes } = await getUnavailableTimes({
      date: appointmentDate,
    });
    const isTimeUnavailable = UnavailableTimes.some(
      ({ appointment_time: appTime }) => appTime === appointmentTime,
    );
    if (isTimeUnavailable)
      return next(
        boomify(
          409,
          'Unavailable Time',
          'please choose another appointment time',
        ),
      );

    const {
      rows: appointmentById,
      rowCount: isAppointmentExist,
    } = await getAppointmentsStatusByIdQuery({
      appointmentId,
    });

    if (!isAppointmentExist) {
      return next(
        boomify(400, 'Invalid Appiontment id', 'This appointment is not exist'),
      );
    }
    const { is_done: isAppointmentDone } = appointmentById[0];

    if (isAppointmentDone) {
      return next(
        boomify(400, 'Closed Appointment', 'This appointment is completed'),
      );
    }
    await updateAppointmentTimeQuery({
      appointmentId,
      appointmentDate,
      appointmentTime,
    });
    return res.json({
      status: 200,
      message: 'success',
    });
  } catch (err) {
    if (err.name === 'RangeError') {
      return next(boomify(400, 'RangeError', err.message));
    }
    if (err.name === 'ValidationError') {
      return next(boomify(400, 'Validation Error', err.errors));
    }
    return next(err);
  }
};

module.exports = editAppointmentTime;
