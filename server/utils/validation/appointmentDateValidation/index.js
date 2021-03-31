const { date, object } = require('yup');
const { parse } = require('date-fns');

const parseDateString = (value, originalValue) =>
  parse(originalValue, 'yyyy-MM-dd', new Date());

const appointmentDateValidationSchema = object({
  appointmentDate: date().transform(parseDateString),
});
module.exports.parseDateString = parseDateString;
module.exports.appointmentDateValidationSchema = appointmentDateValidationSchema;
