const { boomify, historyLogSchema } = require('../../../utils');

const {
  addHistoryLogQuery,
  getPatientProfileData,
} = require('../../../database/queries');

const addHistoryLog = async (req, res, next) => {
  try {
    const {
      body: { description, price, payment },
      params: { patientId },
    } = req;

    await historyLogSchema.validate(
      {
        patientId,
        description,
        price,
        payment,
      },
      {
        abortEarly: false,
      },
    );
    const {
      rows: [patientData],
    } = await getPatientProfileData({ patientId });

    if (!patientData) {
      return next(
        boomify(
          404,
          'patientData not found',
          'Wrong patientData Id, check your data and try again',
        ),
      );
    }

    const { rows: data } = await addHistoryLogQuery({
      patientId,
      description,
      price,
      payment,
    });

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
