// services/authService.js
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generateToken } = require('./jwtServices');

exports.login = async ({ username, password }) => {

const user = await User.findOne({ where: { username } });
if (!user) return res.status(404).json({ message: 'User not found' });

const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ message: 'Invalid password' });

  const token = generateToken({ id: user.id, username: user.username, role: user.role });

  return {
    pesan: 'Login berhasil',
    token,
    user: { id: user.id, username: user.username, role: user.role }
  };
};
