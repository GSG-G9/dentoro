// const boom = require('@hapi/boom');

// const {
//     getUnavailableTimes
// } = require('../../database/queries');
// const { appointmentDateValidation } = require('../../../utils');

// const getAllProfileData = async (req, res, next) => {
//   try {
//     const { date } = req.params;

//     const isValid = await appointmentDateValidation.isValid({
//         date,
//       });

//       if (!isValid) {
//         return next(boom.conflict('Invalided Date'));
//       }

//     const {rows: unavailable} = await getUnavailableTimes({ date });

//     return res.status(201).json({
//       title: 'patient data',
//       detail: 'data collected Successfully',
//       data: {
//       },
//     });
//   } catch (error) {
//     return next(boom.badImplementation(error));
//   }
// };

// module.exports = getAllProfileData;
