const { object, number, string } = require('yup');

const historyLogSchema = object({
  appointmentId: number().min(0).required(),
  description: string().max(200).required(),
  price: number().min(0),
  payment: number().min(0),
});

module.exports = historyLogSchema;
