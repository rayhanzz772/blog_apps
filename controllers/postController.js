const { Post, Tag } = require('../models');
const { Op } = require('sequelize');
const slugify = require('slugify');
const { catatLog } = require('../services/logService');
const { success, created, error } = require('../services/responseService');
const { trackVisit } = require('./postActivityController');

// Uambah post

exports.createPost = async (req, res) => {
console.log('req.user:', req.user.id);
console.log('req.body:', req.body); 
  const {
    title,
    slug,
    content,
    category_id,
    thumbnail,
    published_at,
    status,
    meta_title,
    meta_description,
    tags = []
  } = req.body;

  try {
  // Buat post
  const post = await Post.create({
    title,
    slug,
    content,
    category_id: category_id || 1,
    thumbnail,
    published_at,
    status,
    meta_title,
    meta_description,
    user_id: req.user.id
  });

    // Buat/kaitkan tags
  const tagInstances = await Promise.all(tags.map(async (name) => {
    const [tag] = await Tag.findOrCreate({
      where: { name },
      defaults: { slug: slugify(name, { lower: true }) }
    });
    return tag;
  }));

  await post.setTags(tagInstances); // Set relasi many-to-many

    // Log jika berhasil
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'create',
      entity: 'post',
      entity_id: post.id,
      status: 'success',
      details: post.toJSON()
    });

    return created(res, post, 'Data post berhasil dibuat');
  } catch (err) {
    // Log jika gagal
    await catatLog({
      req,
      user_id: req.user?.id || null, // hindari pakai 0
      action: 'create',
      entity: 'post',
      entity_id: "null",
      status: 'failure',
      details: "null"
    });

    console.error('Gagal membuat post:', error);
    return error(res, err);
  }
};

// Update post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, status } = req.body;

  const post = await Post.findByPk(1);
  console.log(post); // apakah null?
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ pesan: 'Post tidak ditemukan' });

    post.title = title || post.title;
    post.content = content || post.content;
    post.status = status || post.status;
    post.slug = slugify(post.title, { lower: true });

    // Log jika berhasil
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'update',
      entity: 'post',
      entity_id: post.id,
      status: 'success',
      details: post.toJSON()
    });

    await post.save();
    return success(res, post, 'Data post berhasil diupdate');
  } catch (err) {
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'update',
      entity: 'post',
      entity_id: id,
      status: 'failure',
      details: 'null'
    });
    return error(res, err);
  }
};

// Uoft delete post
exports.softDeletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ pesan: 'Post tidak ditemukan' });

    await catatLog({
      req,
      user_id: req.user.id,
      action: 'delete',
      entity: 'post',
      entity_id: post.id,
      status: 'success',
      details: post.toJSON()
    });

    await post.destroy(); // Soft delete akan mengisi deletedAt

    return success(res, id, 'Berhasil dihapus');
  } catch (err) {
    await catatLog({
      req,
      user_id: req.user.id,
      action: 'delete',
      entity: 'post',
      entity_id: id,
      status: 'failure',
      details: 'null'
    });
    return error(res, err);
  }
};

// Get All
exports.getAllPostsAdmin = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const offset = (page - 1) * limit;

    const where = {};

    // Filter berdasarkan judul
    if (search) {
      where.title = { [Op.like]: `%${search}%` };
    }

    // Filter berdasarkan status (publish/draft)
    if (status) {
      where.status = status;
    }

    const result = await Post.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      paranoid: false, // tampilkan yang sudah dihapus juga
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

// Get post publish dan tidak dihapus
exports.getPublishedPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: Tag,
        through: { attributes: [] } // hilangkan data dari tabel pivot
      }
    });
    res.json({ data: posts });
  } catch (err) {
    return error(res, err);
  }
};

// Get post by slug
exports.getPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({
      where: {
        slug,
        status: 'publish',
        deletedAt: null
      }
    });

    if (!post) {
      return res.status(404).json({ message: 'Post tidak ditemukan' });
    }

    // Kirim respons ke user terlebih dahulu
    res.json({ data: post });

    // Jalankan trackVisit di belakang (tidak mengganggu response utama)
    req.body.post_id = post.id;
    await trackVisit(
      req,
      {
        ...res,
        json: () => {}, // jangan kirim response lagi
        status: () => res // agar chaining tidak error
      }
    );

  } catch (err) {
    return error(res, err);
  }
};
