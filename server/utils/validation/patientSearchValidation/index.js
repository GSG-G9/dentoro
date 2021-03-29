const { object, string } = require('yup');

const patientSearchValidation = object({
  firstName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50),
  lastName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50),
  phone: string().length(10),
});

module.exports = patientSearchValidation;
