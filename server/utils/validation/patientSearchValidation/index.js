const { object, string } = require('yup');

const patientSearchValidation = object({
  firstName: string(),

  lastName: string(),

  phone: string(),
});

module.exports = patientSearchValidation;
