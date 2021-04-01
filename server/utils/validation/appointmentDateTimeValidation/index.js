const { object, string } = require('yup');
const { format, parse } = require('date-fns');

const appointmentDateTimeValidation = object({
  appointmentTime: string()
    .min(4)
    .transform((value) =>
      format(parse(value, 'HH:mm:ss', new Date()), 'HH:mm:ss'),
    )
    .required(),
  appointmentDate: string()
    .min(8)
    .transform((value) =>
      format(parse(value, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
    )
    .required(),
});

module.exports = appointmentDateTimeValidation;
