const { body } = require('express-validator');

exports.createUserValidator = [
  body('username').notEmpty().withMessage('Username wajib diisi'),
  body('email').isEmail().withMessage('Email tidak valid'),
  body('password').isLength({ min: 6 }).withMessage('Password minimal 6 karakter'),
  body('role').isIn(['admin', 'customer']).withMessage('Role tidak valid')
];
