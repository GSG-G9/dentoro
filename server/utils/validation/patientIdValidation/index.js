const { object, number } = require('yup');

const patientIdSchema = object({
  patientId: number().min(0).required(),
});

module.exports = patientIdSchema;
