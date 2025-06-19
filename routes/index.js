const express = require('express');
const router = express.Router();

// Importer alle ruter du vil bruke
const pokerRoutes = require('./pokerRoutes');

// Bruk ruten under en bestemt path, for eksempel '/api/poker'
router.use('/poker', pokerRoutes);

module.exports = router;
