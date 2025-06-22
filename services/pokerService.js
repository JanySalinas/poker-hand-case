// Denne filen håndterer logikken for generere, stokke og analysere pokerhender.
// Formålet med designet er å kapsle inn alle operasjoner knyttet til pokerlogikken slik at kontollerne.
// Kan bruke en enkel API (generateHand, compareHands) uten å bry seg om de underliggende beregningene.
const suits = ['r', 'k', 's', 'h']; // ruter, kløver, spar og hjerter 
const values = ['2', '3', '4', '6', '7', '8', '9', 't', 'j','q', 'k', 'a',]; 

// Funksjon: generateDeck
// Hva den gjør:
// - Lager et kortstokk deck ved å kombinere alle verdier med alle farger.
// Hvorfor: 
// - Vi trenger en komplett liste av kort for å kunne stokke og dele ut en hånd.
function generateDeck() {
    const deck = [];
    for(const suit of suits) {
        for (const value of values) {
            deck.push(value + suit);
        }
    }
    return deck;
}

// Funksjon: shuffleDeck
// Hva den gjør:
// - Bruker Fisher-Yates-algoritmen for å stokke kortstokken.
// - Hvorfor:
// - En ordentlig stokking sikrer tilfeldig rekkefølge, noe som er avgjørende for en rettferdig håndutdeling.

    function shuffleDeck(deck) {
    
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; // Bytter plass på elementene.
    }
    return deck;
    }

// Funksjon: analyseHand 
// Hva den gjør:
// - Analyserer en gitt pokerhånd for å telle antall like kort par, tre like etc.
// - Returnerer en tekststreng som beskriver hånden som feks fire like, hus, etc.
// Hvorfor: 
// - Ved å abstraktere analysen av hånden kan vi enkelt utvide logikken senere, 
// - og det blir enklere å teste funksjonaliteten uavhengig av utveklingen av API
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


// Funksjon: generateHand
// Hva den gjør:
// - Lager en ny stokket kortstokk, deler ut de 5 første kortene som en hånd, 
// og analysere hånden.
// Hvorfor: 
// - Den gir en komplett operasjon for å generere en pokerhånd, slik at 
// andre deler av systemet feks kontrolleren bare trenger å kalle denne funksjonen.
exports.generateHand = () => {
    const deck = generateDeck();
    const shuffledDeck = shuffleDeck(deck);
    const hand = shuffledDeck.slice(0, 5);
    const analysis = analyseHand(hand);
    return { hand, analysis };
};

// Funksjon: evaluateHand 
// Hva den gjør: 
// - Bruker analyseHand for å kategorisere hånden, og tildeler deretter en score basert på hånden. 
// Hvorfor:
// - Score-systemet gjør det enkelt å sammenligne flere hender ved å konvertere kvalitativ analyse
// til en numerisk verdi.
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

// Funksjon: compareHands 
// Hva den gjør:
// - Tar imot en liste med hender, evaluerer hver hånd for å finne den med høyest score.
// - Hvorfor:
// - Gir en enkel måte å sammenlige flere pokerhender på for å bestemme hvilken hånd som vinner.
// - Sikrer at koden kun opererer med logikk relatert til hånden, og holder kontrolleren ren.
exports.compareHands = (hands) => {
    if (!Array.isArray(hands) || hands.length < 2) {
        throw new Error("Minst to hender må oppgis for å sammenligne."); // Denne delen sjekker om man får inn et gyldig input som vil si da en array med minst 2 hender. Dersom det ikke er gitt vil det kaste en feil
    }
    let bestScore = -1;
    let winningHand = null;
    hands.forEach(hand => {
        const score = evaluateHand(hand);
        console.log('Hand:', hand, 'Score:', score);
        if (score > bestScore) {
            bestScore = score;
            winningHand = hand;
        }
    });
    return winningHand;
};

// Oppsett og struktur:
// - Filen er strukturert slik at alle operasjoner relatert til pokerhånd-logikken er samlet i en modul. Det gjør det enkelt å vedlikeholde og teste forretningslogikken uavhengig av HTTP-håndtering.
// Generering og stokking:
// - Funksjonene generateDeck og shuffleDeck lager en komplett kortstokk og stokker den grundig. Dette er grunnlaget for alle videre operasjoner.
// Analyse: 
// - analyseHand-funksjonen analyserer en hånd og kategoriserer den 'Fire like, Hus'. Det gir et enkelt system for å bedømme hånden.
// Evaluering og sammenligning:
// - Med evaluateHand konverteres den kvalitetive analysen til en poengsum, slik at compareHands kan sammenlignes flere hender og avgjøre hvilken hånd som vinner.

// Hvorfor: 
//- Ved å bruke denne oppdeling blir koden modulær, noe som gjør det enklere å teste hver funksjon for seg.
// Det gir også en ren lettforståelig logikk for hvordan pokerhender skal genereres, analyseres og sammenlignes.
