const suits = ['r', 'k', 's', 'h']; // ruter, kløver, spar og hjerter 
const values = ['2', '3', '4', '6', '7', '8', '9', 't', 'j','q', 'k', 'a',]; 

function generateDeck() {
    const deck = [];
    for(const suit of suits) {
        for (const value of values) {
            deck.push(value + suit);
        }
    }
    return deck;
}
    function shuffleDeck(deck) {
    // Implementer shufflingen, f.eks. en Fisher–Yates-algoritme
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
    }


    function analyseHand(hand) {
    // en enkel analyse som skal telle like kort:
    const valueCounts = {};
    for (const card of hand) {
        const value = card[0];
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    }
    
    // Enkel analyse: tel antall par, tre like, fire like osv.
    let pairs = 0;
    let trips = false;
    let quads = false;
    for (const val in valueCounts) {
        if (valueCounts[val] === 2) pairs++;
        if (valueCounts[val] === 3) trips = true;
        if (valueCounts[val] === 4) quads = true;
    }

    if (quads) return 'Fire like';
    if (trips && pairs > 0) return 'Hus';
    if (trips) return 'Tress';
    if (pairs === 2) return 'To par';
    if (pairs === 1) return 'Ett par';
    return 'Høyeste kort';
}

//     const counts = Object.values(valueCounts);
//     if (counts.includes(4)) return 'Fire like';
//     if (counts.includes(3) && counts.includes(2)) return 'Hus';
//     if (counts.includes(3)) return 'Tre like';
//     if (counts.filter(c => c === 2).length === 2) return 'To par';
//     if (counts.includes(2)) return 'Ett par';
//     return 'Høyeste kort'
// }

exports.generateHand = () => {
    const deck = generateDeck();
    const shuffledDeck = shuffleDeck(deck);
    const hand = shuffledDeck.slice(0, 5);
    const analysis = analyseHand(hand);
    return { hand, analysis };
};

function evaluateHand(hand) {
    // Bruker analysefunksjonen for å få kategorien på hånden
    const analysis = analyseHand(hand);
    let score = 0;
    switch (analysis) {
        case 'Fire like': 
            score = 6;
            break;
        case 'Hus': 
            score = 5;
            break;
        case 'Tress': 
            score = 4;
            break;
        case 'To par': 
            score = 3;
            break;
        case 'Ett par': 
            score = 2;
            break;
        default:
            score = 1;
    }
    return score;
}

exports.compareHands = (hands) => {
    if (!Array.isArray(hands) || hands.length < 2) {
        throw new Error("Minst to hender må oppgis for å sammenligne.");
    }
    let bestScore = -1;
    let winningHand = null;
    hands.forEach(hand => {
        const score = evaluateHand(hand);
        if (score > bestScore) {
            bestScore = score;
            winningHand = hand;
        }
    });
    return winningHand;
};