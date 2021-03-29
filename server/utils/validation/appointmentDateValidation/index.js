const { date, object } = require('yup');
const { parse, isDate } = require('date-fns');

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());
  return parsedDate;
}

module.exports = object({
  appointmentDate: date().transform(parseDateString),
});
