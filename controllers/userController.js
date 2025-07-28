const User = require('../models/User');
const { catatLog } = require('../services/logService');
const { success, created, error } = require('../services/responseService');

// Create User
exports.createUser = async (req, res) => {
  const { username, password, email, status, role } = req.body;

  try {
    const user = await User.create({username, password, email, role, status});
    // Catat log setelah berhasil
    await catatLog({
      req,
      user_id: user.id,   // ✅ fallback ke 0 kalau belum login
      action: 'create',
      entity_id: user.id,
      entity: 'user',
      status: 'success'
    });
    return created(res, user, 'User berhasil dibuat');
  } catch (err) {
      await catatLog({
      req,
      user_id: null,   // ✅ fallback ke 0 kalau belum login
      action: 'create',
      entity_id: null,
      entity: 'user',
      status: 'failure'
    });
    return error(res, err);
  }
}

// Create User
exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll({ paranoid: false }); // tampilkan semua termasuk yang deleted
    res.json({ data: user });
  } catch (err) {
    return error(res, err);
  }
}