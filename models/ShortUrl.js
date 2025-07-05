const mongoose = require('mongoose');

const shortUrlSchema = new mongoose.Schema({
  shortcode: { type: String, unique: true },
  originalUrl: String,
  createdAt: { type: Date, default: Date.now },
  expiry: Date,
  clickCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);
