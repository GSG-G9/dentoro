const { object, string } = require('yup');
const { format, parse } = require('date-fns');

const appointmentDataValidation = object({
  firstName: string().required(),
  lastName: string().required(),
  phone: string().min(9).max(14).required(),
  email: string().email(),
  diseases: string(),
  birthday: string()
    .min(8)
    .transform((value) =>
      format(parse(value, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
    )
    .required(),
  appointmentTime: string()
    .min(4)
    .transform((value) =>
      format(parse(value, 'HH:mm:ss', new Date()), 'HH:mm:ss'),
    )
    .required(),
  complaints: string(),
  appointmentDate: string()
    .min(8)
    .transform((value) =>
      format(parse(value, 'yyyy-MM-dd', new Date()), 'yyyy-MM-dd'),
    )
    .required(),
});

module.exports = appointmentDataValidation;
