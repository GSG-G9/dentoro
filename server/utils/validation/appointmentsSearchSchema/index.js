const { object, string } = require('yup');

const appointmentsSearchSchema = object({
  fistName: string(),
  lastName: string(),
  phone: string().min(9).max(14),
});

module.exports = appointmentsSearchSchema;
