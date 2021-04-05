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

    if (!user) {
      return next(boomify(400, 'Login Error', 'Incorrect email or password'));
    }

    const { id: userId, password: hashedPassword } = user;
    const comparedPasswords = await compare(password, hashedPassword);

    if (!comparedPasswords) {
      return next(boomify(400, 'Login Error', 'Incorrect email or password'));
    }

    const token = await sign({ userId });
    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .json({ statusCode: 200, message: 'logged in successfully' });
  } catch (error) {
    return next(
      error.name === 'ValidationError'
        ? boomify(400, 'Validation Error', error.errors)
        : error,
    );
  }
};

module.exports = login;
