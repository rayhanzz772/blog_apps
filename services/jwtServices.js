require('dotenv').config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET;

exports.generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: '1h' });
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token wajib ada dan formatnya harus Bearer <token>
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ pesan: 'Token tidak ditemukan atau format salah' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // simpan payload token ke request
    next();
  } catch (error) {
    console.log('Authorization header:', req.headers.authorization);
    return res.status(403).json({ pesan: 'Token tidak valid' });
  }
};