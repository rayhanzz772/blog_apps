const Tag = require('../models/Tag');
const { Op } = require('sequelize');
const { catatLog } = require('../services/logService');
const { success, created, error } = require('../services/responseService');

// Get All
exports.getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;

    const where = {};

    // Filter berdasarkan nama (opsional)
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
    return error(res, err);
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Tag.findByPk(id);
    if (!item) return res.status(404).json({ pesan: 'Tag tidak ditemukan' });
    res.json({ data: item });
  } catch (err) {
    return error(res, err);
  }
};

// Create
exports.create = async (req, res) => {
  try {
    const input = req.body;
    const data = await Tag.create(input);
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'create',
      entity: 'tag',
      entity_id: data.id,
      status: 'success',
      details: data.toJSON()
    });
    return created(res, data, 'Tag berhasil dibuat');
  } catch (err) {
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'create',
      entity: 'tag',
      entity_id: "null",
      status: 'failure',
      details: 'null'
    });
    return error(res, err);
  }
};

// Update
exports.update = async (req, res) => {
  const id = req.params.id;
  try {
    const [affectedRows] = await Tag.update(req.body, { where: { id } });

    if (affectedRows === 0) {
      return res.status(404).json({ message: 'Tag tidak ditemukan atau tidak ada perubahan data.' });
    }

    const updated = await Tag.findByPk(id);
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'update',
      entity: 'tag',
      entity_id: updated.id,
      status: 'success',
      details: updated.toJSON()
    });
    return success(res, updated, 'Data telah diupdate');
  } catch (err) {
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'update',
      entity: 'tag',
      entity_id: id,
      status: 'success',
      details: 'null'
    });
    return error(res, err);
  }
};

// Delete (soft delete)
exports.remove = async (req, res) => {
  try {
    const id = req.params.id;
    await Tag.destroy({ where: { id } });
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'update',
      entity: 'tag',
      entity_id: id,
      status: 'success',
      details: 'null'
    });
    return success(res, id, 'Delete Behasil');
  } catch (err) {
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'delete',
      entity: 'tag',
      entity_id: 'null',
      status: 'failure',
      details: 'null'
    });
    return error(res, err);
  }
};