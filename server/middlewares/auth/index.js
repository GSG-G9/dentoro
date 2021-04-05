const { verifyToken, boomify } = require('../../utils');

const isAuth = async (req, res, next) => {
  try {
    const {
      cookies: { token },
    } = req;
    if (!token)
      return next(
        boomify(401, 'Authentication Error', 'You are not registered yet'),
      );
    await verifyToken(token);
    return next();
  } catch (err) {
    return next(boomify(401, 'Authentication Error', 'You are not Authorized'));
  }
};
module.exports = isAuth;
