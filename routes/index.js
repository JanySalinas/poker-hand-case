const express = require('express');
const router = express.Router();

const pokerRoutes = require('./pokerRoutes');


router.use('/poker', pokerRoutes);

module.exports = router;
