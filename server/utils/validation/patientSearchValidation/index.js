const { object, string } = require('yup');

const patientSearchByNameValidation = object({
  firstName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50),
  lastName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50),
});

const patientSearchByPhoneValidation = object({
  phone: string().length(10),
});

module.exports = {
  patientSearchByNameValidation,
  patientSearchByPhoneValidation,
};
