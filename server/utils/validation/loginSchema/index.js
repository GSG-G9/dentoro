const { string, object } = require('yup');

const loginSchema = object({
  email: string().email().required('Email is required'),
  password: string()
    .min(8, 'Password must be at least 8 char')
    .required('Password is required'),
});

module.exports = loginSchema;
