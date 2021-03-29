const boom = require('@hapi/boom');

const {
  getHistoryLogs,
  getPatientProfileData,
} = require('../../database/queries');

const getAllProfileData = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const {
      rows: [profile],
    } = await getPatientProfileData({ patientId });
    if (!profile) {
      return next(boom.conflict('Invalided patientId'));
    }

    const { rows: history } = await getHistoryLogs({ patientId });
    const balance = history.reduce(
      (sum, obj) => sum + parseFloat(obj.balance),
      0,
    );
    return res.status(201).json({
      title: 'patient data',
      detail: 'data collected Successfully',
      data: {
        profile,
        balance,
        history,
      },
    });
  } catch (error) {
    return next(boom.badImplementation(error));
  }
};

module.exports = getAllProfileData;
