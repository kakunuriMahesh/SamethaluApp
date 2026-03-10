const express = require('express');
const router = express.Router();
const {
  getAllSamethalu,
  getSamethaById,
  searchSamethalu,
  getSamethaByCategory,
  getRandomSametha,
  getSamethaOfTheDay,
  getCategories,
} = require('../controllers/samethaController');

// Order matters: specific routes before parameterized ones
router.get('/search', searchSamethalu);
router.get('/random', getRandomSametha);
router.get('/day', getSamethaOfTheDay);
router.get('/categories', getCategories);
router.get('/category/:category', getSamethaByCategory);
router.get('/:id', getSamethaById);
router.get('/', getAllSamethalu);

module.exports = router;
