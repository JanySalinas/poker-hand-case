const db = require('../db/db');

exports.saveHand = async(hand, analysis) =>{
    const handString = hand.join(',');
    await db.query('INSERT INTO hands (hands, analysis) VALUES (?, ?', [handString, analysis]);
};

exports.getAllHands = async () => {
    const [rows] = await db.query('SELECT * FROM hands ORDER BY ID DESC');
    return rows;
};