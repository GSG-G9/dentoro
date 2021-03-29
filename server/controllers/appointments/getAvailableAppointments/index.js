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
      //   return next(boom.conflict('Invalided Date'));
    }

    const availableTime = [
      '12:00:00',
      '13:00:00',
      '14:00:00',
      '15:00:00',
      '16:00:00',
      '17:00:00',
      '18:00:00',
      '19:00:00',
      '20:00:00',
      '21:00:00',
      '22:00:00',
      '23:00:00',
    ];
    const availableTimeSet = new Set(availableTime);

    const { rows: unavailable } = await getUnavailableTimes({ date });
    console.log(unavailable);

    unavailable.forEach((element) => {
      const { appointment_time: appointmentTime } = element;
      if (availableTimeSet.has(appointmentTime)) {
        availableTimeSet.delete(appointmentTime);
      }
    });

    return res.status(201).json({
      title: 'available time',
      detail: 'data collected Successfully',
      data: Array.from(availableTimeSet),
    });
  } catch (error) {
    return next(error);
    // return next(boom.badImplementation(error));
  }
};

module.exports = getAllProfileData;
