const authService = require('../services/authService');
const { success, created, error } = require('../services/responseService');

exports.login = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    return success(res, result, 'Login berhasil');
  } catch (err) {
    return error(res, err);
  }
};

exports.logout = (req, res) => {
  return success(res, 'Logout berhasil');
};