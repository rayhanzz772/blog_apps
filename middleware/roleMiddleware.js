const { verifyToken } = require('../services/jwtServices');

exports.onlyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ pesan: 'Akses hanya untuk Admin' });
  }
  next();
};

exports.onlyCustomer = (req, res, next) => {
  if (req.user.role !== 'customer') {
    return res.status(403).json({ pesan: 'Akses hanya untuk Customer' });
  }
  next();
};
