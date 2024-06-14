const express = require('express');
const { borrowBook, returnBook, borrowHistory } = require('../controllers/borrowController');
const { protect, member } = require('../middlewares/auth');
const router = express.Router();

router.post('/', protect, member, borrowBook);
router.put('/:id', protect, member, returnBook);
router.get('/history', protect, member, borrowHistory);

module.exports = router;
