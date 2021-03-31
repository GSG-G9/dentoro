const { boomify, historyLogSchema } = require('../../../utils');

const {
  addHistoryLogQuery,
  getAppointmentsStatusByIdQuery,
  updateAppointmentStatusQuery,
} = require('../../../database/queries');

const addHistoryLog = async (req, res, next) => {
  try {
    const {
      body: { description, price, payment },
      params: { appointmentId },
    } = req;

    await historyLogSchema.validate(
      {
        appointmentId,
        description,
        price,
        payment,
      },
      {
        abortEarly: false,
      },
    );
    const {
      rows: [appointmentData],
    } = await getAppointmentsStatusByIdQuery({ appointmentId });

    if (!appointmentData) {
      return next(
        boomify(
          404,
          'appointment not found',
          'Wrong appointment Id, check your data and try again',
        ),
      );
    }

    const { rows: data } = await addHistoryLogQuery({
      appointmentId,
      description,
      price,
      payment,
    });

    if (!appointmentData.is_done) {
      await updateAppointmentStatusQuery({ appointmentId });
    }

    return res.status(201).json({
      title: 'adding a history log',
      detail: 'data added Successfully',
      data,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(boomify(400, 'Validation Error', error.errors));
    }
    return next(error);
  }
};

module.exports = addHistoryLog;
