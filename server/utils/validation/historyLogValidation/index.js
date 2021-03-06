const { object, number, string } = require('yup');

const historyLogSchema = object({
  patientId: number().min(0).required(),
  description: string().required(),
  price: number().min(0),
  payment: number().min(0),
});

module.exports = historyLogSchema;
