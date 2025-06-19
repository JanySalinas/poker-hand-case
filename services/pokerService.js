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


function analyseHand(hand) {
    // en enkel analyse som skal telle like kort:
    const valuecounts = {};
    for (const card of hand) {
        const value = card[0];
        valueCounts[value] = (valueCounts[value] || 0) + 1;
    }

    const counts = Object.values(valueCounts);
    if (counts.includes(4)) return 'Fire like';
    if (counts.includes(3) && counts.includes(2)) return 'Hus';
    if (counts.includes(3)) return 'Tre like';
    if (counts.filter(c => c === 2).length === 2) return 'To par';
    if (counts.includes(2)) return 'Ett par';
    return 'Høyeste kort'
}

function shuffleDeck(deck) {
  // Implementer shufflingen, f.eks. en Fisher–Yates-algoritme
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

exports.generateHand = () => {
    const deck = shuffleDeck(generateDeck());
    const hand = deck.slice(0, 5);
    const analysis = analyseHand(hand);
    return { hand, analysis };
};


exports.compareHands = (hands) => {
    // en placeholder: returnerer første hånd som vinner:
    return { winner: hands[0], reason: 'Sammenligning ikke implementert fullt enda'};
};