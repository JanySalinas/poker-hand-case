const pokerService = require('../services/pokerService');
const HandModel = require('../models/handModel');


exports.generateHand = async (req, res) => {
    try {
        const { playerId } = req.body; // her mottar jeg playerID fra klienten 
        const { hand, analysis } = pokerService.generateHand();
        await HandModel.saveHand(hand, analysis, playerId|| 'unknown') ;
        res.json({ hand, analysis, playerId: playerId || 'unknown' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate hand' });
    }
};

exports.getPreviousHands = async (req, res) => {
    try {
        const hands = await HandModel.getAllHands();
        res.json(hands);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve previous hands' });
    }
};

exports.compareHands = (req, res) => {
    try {
        const { hands } = req.body;
        const result = pokerService.compareHands(hands);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to compare hands' });
    }
};
