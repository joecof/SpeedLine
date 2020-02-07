const express = require('express');
const weatherController = require('../controllers/weatherController')
const router = express.Router();

/**
 * Defined end route /api/weather
 */
router.get('/weather', weatherController.getWeather);

module.exports = router;


