const { parse, format } = require('date-fns');
const { object, string, number } = require('yup');

const patientDataValidation = object({
  patientId: number().positive(),
  firstName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50)
    .required(),
  lastName: string()
    .matches(/^[a-zA-Z]+$/)
    .min(3)
    .max(50)
    .required(),
  phone: string().matches(/^\d+$/).min(9).max(14).required(),
  birthday: string()
    .min(8)
    .transform((value) =>
      format(parse(value, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
    ),
});

module.exports = patientDataValidation;
