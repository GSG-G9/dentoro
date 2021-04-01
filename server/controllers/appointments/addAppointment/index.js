const {
  checkPatientExistence,
  addPatientQuery,
  addAppointmentQuery,
  getUnavailableTimes,
} = require('../../../database/queries');
const {
  appointmentDataValidation,
  boomify,
  checkAvailableTimes,
} = require('../../../utils');

const addAppointment = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      birthday,
      phone,
      diseases,
      appointmentDate,
      appointmentTime,
      complaints,
    } = await appointmentDataValidation.validate(req.body, {
      abortEarly: false,
    });
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

    let patientId;

    const {
      rows: existPatient,
      rowCount: isPatientExist,
    } = await checkPatientExistence({
      phone,
    });
    if (!isPatientExist) {
      const {
        rows: [{ id: newPatientId }],
      } = await addPatientQuery({
        firstName,
        lastName,
        email,
        birthday,
        phone,
        diseases,
      });
      patientId = newPatientId;
    } else {
      patientId = existPatient[0].id;
    }
    await addAppointmentQuery({
      patientId,
      appointmentDate,
      appointmentTime,
      complaints,
    });
    return res.status(201).json({ status: 201, message: 'success' });
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

module.exports = addAppointment;
