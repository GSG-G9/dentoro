const { object, string } = require('yup');

module.exports.patientSearchByNameValidation = object({
  firstName: string()
    .matches(/[a-zA-Z]/)
    .min(3)
    .max(50),
  lastName: string()
    .matches(/[a-zA-Z]/)
    .min(3)
    .max(50),
});

module.exports.patientSearchByPhoneValidation = object({
  phone: string().length(10),
});
