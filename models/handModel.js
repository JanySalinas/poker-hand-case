const { Hand } = require('../db/db');

exports.saveHand = async (hand, analysis, playerId) => {
    const handString = hand.join(',');
    // Use the Sequelize create method instead of db.query
    await Hand.create({
        hands: handString,
        analysis,
        playerId
    });
};

exports.getAllHands = async () => {
    // Use the Sequelize findAll method
    return await Hand.findAll({ order: [['id', 'DESC']] });
};