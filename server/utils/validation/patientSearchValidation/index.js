const { object, string } = require('yup');

const patientSearchValidation = object({
  firstName: string()
    .matches(/^[a-zA-Z%]+$/)
    .min(3)
    .max(50),
  lastName: string()
    .matches(/^[a-zA-Z%]+$/)
    .min(3)
    .max(50),
  phone: string().matches(/^\d+$/).min(9).max(14),
});

module.exports = patientSearchValidation;
