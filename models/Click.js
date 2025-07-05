const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema({
  shortcode: String,
  timestamp: { type: Date, default: Date.now },
  referrer: String,
  location: String
});

module.exports = mongoose.model('Click', clickSchema);
