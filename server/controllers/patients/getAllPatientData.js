const { boomify, patientIdSchema } = require('../../utils');

const {
  getHistoryLogs,
  getPatientProfileData,
} = require('../../database/queries');

const getAllProfileData = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    const isValid = await patientIdSchema.isValid({
      patientId,
    });
    if (!isValid) {
      return next(boomify(400, 'Invalid id', 'Please send a correct one'));
    }
    const {
      rows: [profile],
    } = await getPatientProfileData({ patientId });
    if (!profile) {
      return next(
        boomify(404, 'Page is not found', 'Theres no user with this id'),
      );
    }

    const { rows: history } = await getHistoryLogs({ patientId });
    const balance = history.reduce(
      (sum, obj) => sum + (parseFloat(obj.price) - parseFloat(obj.payment)),
      0,
    );
    return res.json({
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
