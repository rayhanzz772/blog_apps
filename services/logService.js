const LogActivity = require('../models/LogActivity');

exports.catatLog = async ({
  req,
  user_id,
  action,
  entity,
  entity_id,
  status = 'success',
  details = {},
  error_message = null
}) => {
  try {
    await LogActivity.create({
      user_id,
      action,             
      entity,             
      entity_id,
      status,
      details,
      error_message,
      ip_address: req.ip || 'unknown',
      user_agent: req.headers['user-agent'] || 'unknown',
      module: req.route?.path || 'unknown',
      request_method: req.method,
      url_accessed: req.originalUrl
    });
  } catch (err) {
    console.error('Gagal mencatat log aktivitas:', err);
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const data = await LogActivity.findAll();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ pesan: 'Gagal mengambil data', error });
  }
};
