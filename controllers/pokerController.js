const pokerService = require('../services/pokerService');
const HandModel = require('../models/handModel');


exports.generateHand = async (req, res) => {
    try {
        const { hand, analysis } = pokerService.generateHand();
        await HandModel.saveHand(hand, analysis);
        res.json({ hand, analysis });
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
