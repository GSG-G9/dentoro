module.exports = (req, res, next) => {
	res.json({ message: __filename });
};
