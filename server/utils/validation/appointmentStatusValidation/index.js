const { object, number, boolean } = require('yup');

const appointmentStatusValidation = object({
  appointmentId: number().required(),
  isDone: boolean().required(),
});

module.exports = appointmentStatusValidation;
