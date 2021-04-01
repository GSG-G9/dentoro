const { parse, isDate } = require('date-fns');
const { object, string, date } = require('yup');

function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, 'yyyy-MM-dd', new Date());

  return parsedDate;
}

const patientDataValidation = object({
  patientId: string(),
  firstName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50),
  lastName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50),
  phone: string().matches(/^\d+$/).min(9).max(14),
  birthday: date().transform(parseDateString),
});

module.exports = patientDataValidation;
