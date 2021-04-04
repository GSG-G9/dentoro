const { string, object } = require('yup');
const { parse, format } = require('date-fns');

const appointmentDateValidationSchema = object({
  appointmentDate: string().transform((value) =>
    format(parse(value, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
  ),
});
module.exports.appointmentDateValidationSchema = appointmentDateValidationSchema;
