const { getUnavailableTimes } = require('../../../database/queries');
const { appointmentDateValidation, boomify } = require('../../../utils');

const getAllProfileData = async (req, res, next) => {
  try {
    const { date } = req.params;

    const isValid = await appointmentDateValidation.isValid({
      appointmentDate: date,
    });

    if (!isValid) {
      return next(boomify(400, 'Invalid Date', 'Please send a correct date'));
    }

    const availableTime = [
      '08:00:00',
      '09:00:00',
      '10:00:00',
      '11:00:00',
      '12:00:00',
      '13:00:00',
      '14:00:00',
      '15:00:00',
      '16:00:00',
      '17:00:00',
      '18:00:00',
    ];
    const availableTimeSet = new Set(availableTime);

    const { rows: unavailableTime } = await getUnavailableTimes({ date });
    console.log(unavailableTime);

    unavailableTime.forEach((element) => {
      const { appointment_time: appointmentTime } = element;
      if (availableTimeSet.has(appointmentTime)) {
        availableTimeSet.delete(appointmentTime);
      }
    });

    return res.json({
      title: 'available time',
      detail: 'data collected Successfully',
      data: Array.from(availableTimeSet),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = getAllProfileData;
