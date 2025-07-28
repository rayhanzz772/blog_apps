const { body } = require('express-validator');

exports.createCategoryValidator = [
  body('name').notEmpty().withMessage('Judul wajib diisi'),
  body('slug').notEmpty().withMessage('Slug wajib diisi'),
  body('slug').isSlug().withMessage('Format slug tidak valid'),
];
