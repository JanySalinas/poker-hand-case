const { Hand } = require('./db/db');

async function seed() {
    try {
        const samples = [
            { hand: ['2r', '3k', '4s', '6h', '7r'], analysis: 'Høyeste kort', playerId: 'player1' },
            { hand: ['8r', '8k', '8s', '6h', '7r'], analysis: 'Tress', playerId: 'player2' },
            { hand: ['2r', '2k', '2s', '2h', '7r'], analysis: 'Fire like', playerId: 'player3' },
            { hand: ['3r', '3k', '4s', '5h', '7r'], analysis: 'Ett par', playerId: 'player4' },
            { hand: ['4r', '4k', '5s', '5h', '6r'], analysis: 'To par', playerId: 'player5' },
            { hand: ['6r', '6k', '6s', '7h', '8r'], analysis: 'Tress', playerId: 'player6' },
            { hand: ['8r', '8k', '8s', '8h', '9r'], analysis: 'Fire like', playerId: 'player7' },
            { hand: ['2r', '2k', '2s', '3h', '3r'], analysis: 'Hus', playerId: 'player8' },
        ];

        for (const sample of samples) {
            const handString = sample.hand.join(',');
            await Hand.create({
                hands: handString,
                analysis: sample.analysis,
                playerId: sample.playerId
            });
            console.log(`Inserted sample for ${sample.playerId}`);
        }

        console.log('Seed complete.');
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

seed();