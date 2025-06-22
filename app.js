// Laster inn miljøvariabler fra .env filen for å sikre at configs som PORT holdes utenfor koden.
require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);

// Importerer nødvendige mpoduler: express for webserver, cors for tverr-opprinnelses tilgang, og ruter for API-en.
const express = require('express');
const cors = require('cors');

//Importerer rutehåndteringer for poker og generelle API-ruter.
const pokerRoutes = require('./routes/pokerRoutes');
const routes = require('./routes');

// Oppretter en Express-applikasjon.
const app = express();

//Aktiverer CORS for å tillate forespørsler fra andre domener
app.use(cors());

// Middleware for å parse JSON-data i innkommende forespørsler.
app.use(express.json());

// Serverer statiske filer fra public-mappen. Dette kan feks inkludere HTML, CSS og JavaScript for fronted.
app.use(express.static('public'))

// Definerer API-endepunktene:
// - Ruter relatert til pokerfunksjonalitet håndteres under /api/poker
// - Andre API-ruter håndteres under /api.
app.use('/api/poker', pokerRoutes);
app.use('/api', routes);


// Starter serveren på port definert i miljøvariablene eller port 3000 som standard.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveren kjører på http://localhost:${PORT}`);
    
});

// Oppsett og config:
// - Koden setter opp en express-server med støtte for JSON-forespørsler og CORS, og laster miljøvariabler for config.
// Rutehåndtering og statiske filer:
// - Ruter for pokerfunksjonalitet og andre API-endepunkter er modulært delt opp, mens statiske filer serveres fra public mappen for bruk av frontend komponenter.
// Hvorfor:
// - Denne strukturen gir en ren og modulær serverkonfigurasjon som er lett å vedlikeholde, teste og utvide ved å dele opp logikken basert på ansvar.