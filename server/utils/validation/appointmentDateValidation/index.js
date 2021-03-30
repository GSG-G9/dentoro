const { date, object } = require('yup');
const { parse, isDate } = require('date-fns');

const parseDateString = (value, originalValue) => {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());
  return parsedDate;
};

const appointmentDateValidationSchema = object({
  appointmentDate: date().transform(parseDateString),
});
module.exports.parseDateString = parseDateString;
module.exports.appointmentDateValidationSchema = appointmentDateValidationSchema;
