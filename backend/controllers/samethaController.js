const Sametha = require('../models/Sametha');

// GET /api/samethalu - Get all active samethalu with pagination
const getAllSamethalu = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const total = await Sametha.countDocuments({ isActive: true });
    const samethalu = await Sametha.find({ isActive: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: samethalu,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/samethalu/:id
const getSamethaById = async (req, res) => {
  try {
    const sametha = await Sametha.findOne({ _id: req.params.id, isActive: true });
    if (!sametha) return res.status(404).json({ success: false, message: 'Sametha not found' });
    res.json({ success: true, data: sametha });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/samethalu/search?q=term
const searchSamethalu = async (req, res) => {
  try {
    const q = req.query.q || '';
    if (!q.trim()) return res.json({ success: true, data: [] });

    const regex = new RegExp(q, 'i');
    const results = await Sametha.find({
      isActive: true,
      $or: [
        { samethaTelugu: regex },
        { samethaEnglish: regex },
        { meaningTelugu: regex },
        { meaningEnglish: regex },
        { explanationTelugu: regex },
        { category: regex },
        { tags: { $in: [regex] } },
      ],
    }).limit(50);

    res.json({ success: true, data: results });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/samethalu/category/:category
const getSamethaByCategory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const filter = { isActive: true, category: req.params.category };
    const total = await Sametha.countDocuments(filter);
    const samethalu = await Sametha.find(filter).skip(skip).limit(limit);

    res.json({ success: true, total, page, pages: Math.ceil(total / limit), data: samethalu });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/samethalu/random
const getRandomSametha = async (req, res) => {
  try {
    const count = await Sametha.countDocuments({ isActive: true });
    if (count === 0) return res.status(404).json({ success: false, message: 'No samethalu found' });
    const random = Math.floor(Math.random() * count);
    const sametha = await Sametha.findOne({ isActive: true }).skip(random);
    res.json({ success: true, data: sametha });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/samethalu/day - Sametha of the Day
const getSamethaOfTheDay = async (req, res) => {
  try {
    const count = await Sametha.countDocuments({ isActive: true });
    if (count === 0) return res.status(404).json({ success: false, message: 'No samethalu found' });

    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const index = dayOfYear % count;
    const sametha = await Sametha.findOne({ isActive: true }).skip(index);
    res.json({ success: true, data: sametha });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/samethalu/categories - List all categories with counts
const getCategories = async (req, res) => {
  try {
    const categories = await Sametha.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getAllSamethalu,
  getSamethaById,
  searchSamethalu,
  getSamethaByCategory,
  getRandomSametha,
  getSamethaOfTheDay,
  getCategories,
};
