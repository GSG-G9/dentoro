const { boomify, historyLogSchema } = require('../../../utils');

const {
  addHistoryLogQuery,
  getAppointmentsByIdQuery,
  updateAppointmentStatusQuery,
} = require('../../../database/queries');

const addHistoryLog = async (req, res, next) => {
  try {
    const { appointmentId } = req.params;
    const { description, price, payment } = req.body;

    const isValid = await historyLogSchema.isValid({
      appointmentId,
      description,
      price,
      payment,
    });

    if (!isValid) {
      return next(
        boomify(400, 'Invalid input', 'please Correct the input and try again'),
      );
    }

    const {
      rows: [appointmentData],
    } = await getAppointmentsByIdQuery({ appointmentId });

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

    return res.json({
      title: 'adding a history log',
      detail: 'data added Successfully',
      data,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = addHistoryLog;
