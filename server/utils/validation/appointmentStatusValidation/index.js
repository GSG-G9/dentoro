const { object, number, boolean } = require('yup');

const appointmentIdValidation = object({
  appointmentId: number().required(),
  isDone: boolean().required(),
});

module.exports = appointmentIdValidation;
