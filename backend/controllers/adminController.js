const jwt = require('jsonwebtoken');
const Sametha = require('../models/Sametha');

// POST /admin/login
const adminLogin = async (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid admin password' });
  }
  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ success: true, token });
};

// GET /admin/sametha/list
const listSamethalu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';

    const filter = {};
    if (search) {
      const regex = new RegExp(search, 'i');
      filter.$or = [{ samethaTelugu: regex }, { meaningTelugu: regex }];
    }
    if (category) filter.category = category;

    const total = await Sametha.countDocuments(filter);
    const samethalu = await Sametha.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ success: true, total, page, pages: Math.ceil(total / limit), data: samethalu });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /admin/sametha/:id
const getSamethaById = async (req, res) => {
  try {
    const sametha = await Sametha.findById(req.params.id);
    if (!sametha) return res.status(404).json({ success: false, message: 'Sametha not found' });
    res.json({ success: true, data: sametha });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /admin/sametha
const addSametha = async (req, res) => {
  try {
    const data = req.body;
    // Auto-detect hasEnglish
    data.hasEnglish = !!(data.samethaEnglish && data.meaningEnglish);
    const sametha = await Sametha.create(data);
    res.status(201).json({ success: true, data: sametha });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /admin/sametha/:id
const updateSametha = async (req, res) => {
  try {
    const data = req.body;
    data.hasEnglish = !!(data.samethaEnglish && data.meaningEnglish);
    const sametha = await Sametha.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    });
    if (!sametha) return res.status(404).json({ success: false, message: 'Sametha not found' });
    res.json({ success: true, data: sametha });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /admin/sametha/:id
const deleteSametha = async (req, res) => {
  try {
    const sametha = await Sametha.findByIdAndDelete(req.params.id);
    if (!sametha) return res.status(404).json({ success: false, message: 'Sametha not found' });
    res.json({ success: true, message: 'Sametha deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /admin/stats
const getStats = async (req, res) => {
  try {
    const total = await Sametha.countDocuments();
    const active = await Sametha.countDocuments({ isActive: true });
    const withEnglish = await Sametha.countDocuments({ hasEnglish: true });
    const categories = await Sametha.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: { total, active, withEnglish, categories } });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { adminLogin, listSamethalu, getSamethaById, addSametha, updateSametha, deleteSametha, getStats };
