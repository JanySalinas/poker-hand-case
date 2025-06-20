const db = require('../db/db');

exports.saveHand = async(hand, analysis, playerId) =>{
    const handString = hand.join(',');
    await db.query('INSERT INTO hands (hands, analysis, playerId) VALUES (?, ?, ?)', [handString, analysis, playerId]);
};

exports.getAllHands = async () => {
    const [rows] = await db.query('SELECT * FROM hands ORDER BY ID DESC');
    return rows;
};