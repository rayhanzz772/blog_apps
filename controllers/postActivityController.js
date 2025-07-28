const PostActivity = require('../models/PostActivity');
const { success, created, error } = require('../services/responseService');
const UAParser = require('ua-parser-js');
const parser = new UAParser();

exports.trackVisit = async (req, res) => {
  console.log('BODY:', req.body);
  try {
    const { post_id } = req.body;
    if (!post_id) {
      return res.status(400).json({ message: 'post_id wajib dikirim' });
    }

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const rawUA = req.headers['user-agent'];
    const parsedUA = parser.setUA(rawUA).getResult();

    const userAgent = {
      browser: parsedUA.browser.name || 'Unknown',
      os: parsedUA.os.name || 'Unknown',
      device: parsedUA.device.type || 'Desktop',
      raw: rawUA
    };

    await PostActivity.create({ post_id, ip, userAgent });

    return success(res, userAgent, 'Data kunjungan berhasil dicatat');
  } catch (err) {
    console.error(err);
    return error(res, err);
  }
};

exports.getPostActivities = async (req, res) => {
  try {
    const { post_id } = req.params;

    const logs = await PostActivity.findAll({
      where: { post_id },
      order: [['createdAt', 'DESC']]
    });

    res.json({ data: logs });
  } catch (error) {
    console.error(error);
    return error(res, err);
  }
};
