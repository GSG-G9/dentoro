const { compare } = require('bcrypt');
const { loginSchema, boomify } = require('../../../utils');
const { getUserDataQeury } = require('../../../database/queries');
const { sign } = require('../../../utils/jwt');

const login = async (req, res, next) => {
  try {
    const { email, password } = await loginSchema.validate(req.body, {
      abortEarly: false,
    });

    const {
      rows: [user],
    } = await getUserDataQeury({ email });

    if (user) {
      const { id: userId, password: hashedPassword } = user;
      const comparedPasswords = await compare(password, hashedPassword);
      if (!comparedPasswords) {
        return next(boomify(400, 'Login Error', 'Incorrect password'));
      }
      const token = await sign({ userId });
      return res
        .cookie('token', token, { httpOnly: true })
        .status(201)
        .json({ statusCode: 201, message: 'logged in successfully' });
    }
    return next(boomify(400, 'Login Error', 'Incorrect email'));
  } catch (error) {
    return next(
      error.name === 'ValidationError'
        ? boomify(400, 'Validation Error', error.errors)
        : error,
    );
  }
};

module.exports = login;
