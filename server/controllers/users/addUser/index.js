const { hash } = require('bcrypt');

const { addUserSchema, boomify } = require('../../../utils');
const {
  checkUserIdByEmail,
  addUserQuery,
} = require('../../../database/queries');
const { signToken } = require('../../../utils');

const addUser = async (req, res, next) => {
  try {
    const { email, password } = await addUserSchema.validate(req.body, {
      abortEarly: false,
    });

    const {
      rows: [userByEmail],
    } = await checkUserIdByEmail({ email });

    if (userByEmail) {
      return next(boomify(409, 'checking email', 'This email already exists'));
    }

    const hashedPassword = await hash(password, 10);

    const {
      rows: [{ id: userId }],
    } = await addUserQuery({ email, password: hashedPassword });

    const token = await signToken({ userId });
    return res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      })
      .status(201)
      .json({
        title: 'User Registration',
        detail: 'Successfully registered new dentist',
      });
  } catch (error) {
    console.log(error);
    return next(
      error.name === 'ValidationError'
        ? boomify(409, 'Validation Error', error.errors)
        : error,
    );
  }
};

module.exports = addUser;
