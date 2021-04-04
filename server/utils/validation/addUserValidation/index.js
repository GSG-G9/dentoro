const { object, string, ref } = require('yup');

const addUserSchema = object({
  email: string().email().required(),
  password: string().min(8).required(),
  passwordConfirm: string().when('password', (password, field) =>
    password ? field.required().oneOf([ref('password')]) : field,
  ),
});

module.exports = addUserSchema;
