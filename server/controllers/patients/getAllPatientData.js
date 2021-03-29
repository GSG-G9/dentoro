const { boomify } = require('../../utils');

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
      return next(boomify(400, 'Invalid id', 'Please send a correct one'));
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
    return next(error);
  }
};

module.exports = getAllProfileData;
