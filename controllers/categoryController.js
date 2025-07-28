const Category = require('../models/Category');
const { success, created, error } = require('../services/responseService');
const { catatLog } = require('../services/logService');
const { Op } = require('sequelize');

// Get All

exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    const where = {};

    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }

    const result = await Category.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      total: result.count,
      currentPage: parseInt(page),
      totalPages: Math.ceil(result.count / limit),
      data: result.rows
    });

  } catch (err) {
    return error(res, error)
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Category.findByPk(id);
    if (!item) return res.status(404).json({ pesan: 'Category tidak ditemukan' });
    res.json({ data: item });
  } catch (err) {
    return error(res, error)
  }
};

// Create
exports.create = async (req, res) => {
  try {
    const input = req.body;
    const data = await Category.create(input);
    console.log('Category data:', data?.toJSON?.());
    await catatLog({
          req,
          user_id: req.user.id,
          action: 'create',
          entity: 'category',
          entity_id: data.id,
          status: 'success',
          details: data.toJSON()
        });
    return created(res, created, 'Kategori berhasil ditambahkan');
  } catch (err) {
        await catatLog({
          req,
          user_id: req.user.id,
          action: 'create',
          entity: 'category',
          entity_id: 0,
          status: 'failure',
          details: 'null'
        });
    return error(res, err)
  }
};

// Update
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const [affectedRows] = await Category.update(req.body, { where: { id } });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan atau tidak ada perubahan data.' });
    }

    // Ambil ulang data kategori yang sudah diupdate
    const updated = await Category.findByPk(id);

    await catatLog({
      req,
      user_id: req.user.id,
      action: 'update',
      entity: 'category',
      entity_id: updated.id,
      status: 'success',
      details: updated.toJSON()
    });

    return success(res, updated, 'Data kategori berhasil diperbarui');

  } catch (err) {
    await catatLog({
      req,
      user_id: req.user?.id ?? null,
      action: 'update',
      entity: 'category',
      entity_id: id,
      status: 'failure',
      details: err.message
    });

    return error(res, err);
  }
};

// Delete (soft delete)
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Category.destroy({ where: { id } });
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'delete',
      entity: 'category',
      entity_id: id,
      status: 'success',
      details: 'null'
    });
    return success(res, id, 'Data berhasil dihapus');
  } catch (err) {
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'delete',
      entity: 'category',
      entity_id: 'null',
      status: 'failure',
      details: 'null'
    });
    return error(res, err)
  }
};