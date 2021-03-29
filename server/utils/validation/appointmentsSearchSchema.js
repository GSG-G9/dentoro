const { object, number, string } = require('yup');

const appointmentsSearchSchema = object({
  fistName: string(),
  lastName: string(),
  phone: number().positive(),
});

module.exports = appointmentsSearchSchema;
