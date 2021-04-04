const { boomify, appointmentStatusValidation } = require('../../../utils');

const { updateAppointmentStatusQuery } = require('../../../database/queries');

const editAppointmentStatus = async (req, res, next) => {
  try {
    const {
      appointmentId,
      isDone,
    } = await appointmentStatusValidation.validate(
      {
        ...req.params,
        ...req.body,
      },
      { abortEarly: false },
    );

    if (isDone === true)
      return next(
        boomify(400, 'Closed Appointment', 'This appointment is completed'),
      );
    const { rowCount: isUpdateSuccess } = await updateAppointmentStatusQuery({
      appointmentId,
    });
    if (!isUpdateSuccess) {
      return next(
        boomify(
          400,
          'Bad request',
          'Please make sure you are sending a rightful request',
        ),
      );
    }
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
