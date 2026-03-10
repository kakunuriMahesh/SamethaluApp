const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const {
  adminLogin,
  listSamethalu,
  getSamethaById,
  addSametha,
  updateSametha,
  deleteSametha,
  getStats,
} = require('../controllers/adminController');

// Auth route (public)
router.post('/login', adminLogin);

// Protected admin routes
router.get('/stats', adminAuth, getStats);
router.get('/sametha/list', adminAuth, listSamethalu);
router.get('/sametha/:id', adminAuth, getSamethaById);
router.post('/sametha', adminAuth, addSametha);
router.put('/sametha/:id', adminAuth, updateSametha);
router.delete('/sametha/:id', adminAuth, deleteSametha);

module.exports = router;
