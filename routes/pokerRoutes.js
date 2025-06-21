const express = require('express');
const router = express.Router();
const pokerController = require('../controllers/pokerController');

// Genererer en ny pokerhånd
router.post('/generate-hand', pokerController.generateHand);

// Henter tidligere genererte hender lagret i databasen
router.get('/previous-hands', pokerController.getPreviousHands);

// Sammenligner to pokerhender og returnerer vinneren
router.post('/compare-hands', pokerController.compareHands);

module.exports = router;