const express = require('express');
const app = express();
const logger = require('./middlewares/logger');
const urlRoutes = require('./routes/urlRoutes');

app.use(express.json());
app.use(logger);
app.use('/', urlRoutes);

module.exports = app;
