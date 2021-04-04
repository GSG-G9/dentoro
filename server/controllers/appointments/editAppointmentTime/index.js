const {
  appointmentDateTimeValidation,
  checkAvailableTimes,
  boomify,
} = require('../../../utils');

const {
  getUnavailableTimes,
  updateAppointmentTimeQuery,
} = require('../../../database/queries');

const editAppointmentTime = async (req, res, next) => {
  try {
    const {
      appointmentDate,
      appointmentTime,
      appointmentId,
      isDone,
    } = await appointmentDateTimeValidation.validate({
      ...req.body,
      ...req.params,
    });

    if (isDone === true)
      return next(
        boomify(400, 'Closed Appointment', 'This appointment is completed'),
      );
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
    const { rowCount: isUpdateSuccess } = await updateAppointmentTimeQuery({
      appointmentId,
      appointmentDate,
      appointmentTime,
    });
    if (!isUpdateSuccess)
      return next(
        boomify(
          400,
          'Bad request',
          'Please make sure you are sending a rightful request',
        ),
      );
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
