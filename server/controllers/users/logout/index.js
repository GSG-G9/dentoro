const logout = (req, res) => {
  res
    .clearCookie('token')
    .json({ stateCode: 200, message: 'logged out successfully' });
};
module.exports = logout;
