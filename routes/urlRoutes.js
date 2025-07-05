const express = require('express');
const router = express.Router();
const {
  createShortUrl,
  redirectUrl,
  getUrlStats
} = require('../controllers/urlController');

router.post('/shorturls', createShortUrl);
router.get('/shorturls/:code', getUrlStats);
router.get('/:code', redirectUrl);

module.exports = router;
