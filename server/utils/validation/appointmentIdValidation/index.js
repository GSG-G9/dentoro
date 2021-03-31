const { object, number } = require('yup');

const appointmentIdValidation = object({
  appointmentId: number().required(),
});

module.exports = appointmentIdValidation;
