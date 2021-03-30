const { object, string, date } = require('yup');
const { parseDateString } = require('../appointmentDateValidation');

const appointmentDataValidation = object({
  firstName: string().required(),
  lastName: string().required(),
  phone: string().min(9).max(14).required(),
  email: string().email(),
  birthday: date().transform(parseDateString),
  appointmentTime: string().required(),
  complaints: string(),
  appointmentDate: date().transform(parseDateString),
});

module.exports = appointmentDataValidation;
