// Denne kontrollen håndtere de ulike endepunktene for poker hendelser.
// Ved å dele opp logikken slik, følger jeg prinsippene for seperasjon av disse bekymringene:
// - HTTP-forespørsler håndteres her.
 // Eksempler på HTTP - forespørsler: 
 // - GET: Hente data fra severen.
 // - POST: Sende data til serveren for å opprette en ressurs.
 // - PUT: Oppdaterer en eksisterende ressurs.
 // - DELETE: Slette ressurs. 
 // Men i denne casen har jeg bare brukt GET og POST av HTTP-forespørsler.
// - Forretningslogikken ligger i pokerService.
// - Datatilgang håndteres av HandModel.

const pokerService = require('../services/pokerService'); //inkludere forretningslogikk for poker.
const HandModel = require('../models/handModel'); // Håndterer lagring og henting av pokerhender.


// Endpoint: generateHand 
// Hvordan/case :
// - Jeg mottar player-id fra klienten via req.body.
// - Genererer en ny poker hånd og tilhørende analyse ved å kalle pokerService.generateHand().
// - Lagrer hånden ved ved hjelp av HandModel, og bruker 'unknown' dersom playerId ikke oppgitt. // jeg valgte å lage playerId slik jeg kunne lage hardkodet eksempler for å teste. 
// - Fordelen med dette er ved å delegere logikken til en egen service, blir testen av denne funskjonaliteten enklere og koden mer oversiktlig.
exports.generateHand = async (req, res) => {
    try {
        const { playerId } = req.body; // her mottar jeg playerID fra klientens forespørsel 
        const { hand, analysis } = pokerService.generateHand(); // Genererer hånd og analyse via service 
        await HandModel.saveHand(hand, analysis, playerId|| 'unknown') ; // Lagrer data, selv om playerId mangler
        res.json({ hand, analysis, playerId: playerId || 'unknown' }); // Returnerer resultat som JSON.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate hand' });
    }
};


// Endpoint: getPreviousHands
// Hvordan/case:
// - Henter alle tidligere lagrende hender ved å kalle HandModel.getAllHands().
// Fordel: Dette gjør det enkelt å vise en historikk over spill, og skiller datatilgangen ut av businedd logikken. 
exports.getPreviousHands = async (req, res) => {
    try {
        const hands = await HandModel.getAllHands(); // Henter alle lagrede hender.
        res.json(hands); // Returnerer listen som JSON.
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve previous hands' });
    }
};

// Endpoint: CompareHands
// Hvordan/case:
// - Tar imot en liste med hender fra klienten.
// - Bruker pokerService til å sammenligne disse hender og bestemme vinneren.
// Fordel: ved å abstrahere sammenligningslogikken til service-nivå, får vi en renere og lettere testbar kontoller.
exports.compareHands = (req, res) => {
    try {
        const { hands } = req.body; // Henter hender fra forespørsel
        const result = pokerService.compareHands(hands); // Sammenligner hender via service 
        res.json(result); // Returnerer resultat
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to compare hands' });
    }
};


// Filens funksjon: Denne filen pokerController.js fungerer som et grenseavsnitt mellom klientens HTTP-forespørsler og backend-logikken.

// Hvordan den fungerer: - Den mottar forespørsler som GET og POST med data fra klienten.
// - Den benytter pokerService til å utføre foretningslogikken, for eksempel å generere nye pokerhender, analyserer dem og sammenligne ulike hender.
// - Den sender data videre til HandModel for lagring og henting av data.
// - Eventuelle resultater eller feilmeldinger returneres som JSON til klienten.

// Rollen i nettsiden:
// - Kontrolleren er en sentral del av applikasjonen, fordi den binder brukergrensesnittet sammen med forretningslogikken.
// Dette sikrer at data flyter riktig gjennnom applikasjonen, og gjør at funksjonaliteten for pokerhender både kan testes isolert via PokerService og integreres med databasen via HandModel.