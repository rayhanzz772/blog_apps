const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      pesan: 'Validasi gagal',
      errors: errors.array()
    });
  }
  next();
};
