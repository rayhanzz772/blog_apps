const { verifyToken } = require('../utils/jwt');

exports.auth = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.status(401).json({ pesan: 'Token tidak ditemukan' });
  }

  const token = bearer.split(' ')[1];

  try {
    const payload = verifyToken(token);
    req.user = payload; // simpan info user ke request
    next();
  } catch (err) {
    return res.status(401).json({ pesan: 'Token tidak valid' });
  }
};
