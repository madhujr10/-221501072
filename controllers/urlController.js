const ShortUrl = require('../models/ShortUrl');
const Click = require('../models/Click');
const generateCode = require('../utils/generateCode');
const moment = require('moment');

exports.createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;
    const code = shortcode || generateCode();

    const expiry = moment().add(validity, 'minutes').toDate();

    const newUrl = await ShortUrl.create({ shortcode: code, originalUrl: url, expiry });
    return res.status(201).json({
      shortLink: `${req.protocol}://${req.get('host')}/${code}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    return res.status(500).json({ message: "Error creating short URL" });
  }
};

exports.redirectUrl = async (req, res) => {
  const code = req.params.code;
  const short = await ShortUrl.findOne({ shortcode: code });

  if (!short) return res.status(404).json({ error: "Shortcode not found" });
  if (new Date() > short.expiry) return res.status(410).json({ error: "Link expired" });

  short.clickCount++;
  await short.save();

  await Click.create({
    shortcode: code,
    referrer: req.get('Referrer') || 'unknown',
    location: 'IN'  // You can integrate IP geolocation if needed
  });

  return res.redirect(short.originalUrl);
};

exports.getUrlStats = async (req, res) => {
  const code = req.params.code;
  const short = await ShortUrl.findOne({ shortcode: code });
  if (!short) return res.status(404).json({ error: "Shortcode not found" });

  const clicks = await Click.find({ shortcode: code });

  return res.json({
    originalUrl: short.originalUrl,
    createdAt: short.createdAt,
    expiry: short.expiry,
    clickCount: short.clickCount,
    clickDetails: clicks
  });
};
