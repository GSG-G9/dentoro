const authorizedUser = (req, res) => {
  res.json({ stateCode: 200, message: 'Authorized' });
};
module.exports = authorizedUser;
