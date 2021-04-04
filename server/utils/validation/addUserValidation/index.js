const { object, string } = require('yup');

const addUserSchema = object({
  email: string().email().required(),
  password: string().min(8).required(),
});

module.exports = addUserSchema;
