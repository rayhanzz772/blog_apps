const { body } = require('express-validator');

exports.createPostValidator = [
  body('title').notEmpty().withMessage('Judul wajib diisi'),
  body('slug').notEmpty().withMessage('Slug wajib diisi'),
  body('slug').isSlug().withMessage('Format slug tidak valid'),
  body('content').notEmpty().withMessage('Konten wajib diisi'),
  body('category_id').isInt().withMessage('ID kategori harus angka'),
  body('tags').isArray().withMessage('Tags harus berupa array'),
];
