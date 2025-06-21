// Denne filen fyller databasen med forhåndsdefinerte eksempledatasett seeds for testing og utvikling.
// Hvorfor:
// - Ved å ha en seed-fil kan vi enkelt populere databasen med eksempeldatasett uten å måtte sende HTTP-forespørsler manuelt.
// - Dette gjør det enklere for meg å teste applikasjonen med forhåndsdefinert data.
// - Koden bidrar til å validere at modellen og ORM konfigurasjonen fungerer som forventet.
const { Hand } = require('./db/db');

async function seed() {
    try {
        // Eksempel med ulike pokerhender, analyse av hånden, og en tilhørende playerId.
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
        // For hver sample konverteres pokerhånd-arrayet til en kommaseparert streng og lagres i databsen ved hjelp av Sequelize.
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
        process.exit(0); // Avslutter prosessen når seedingen er fullført
    } catch (error) {
        console.error(error);
        process.exit(1); // Avslutter med feilstatus ved eventuelle problemer.
    }
}

seed();

// Formål med seed.js:
// Filen brukes til å populere databasen med forhåndsdefinerte eksempeldatasett. Dette er nyttig for meg når jeg skal teste.
// Oppsett:
// -  Importere Hand-modellen for å utføre databaseoperasjoner.
// - Dataene inneholder ulike eksempler på pokerhender med tilhørende analyse og spiller-Id.
// Hvordan koden fungerer:
// - Konverterer hver pokerhånd som et array til en kommaseparert streng slik at den kan lagres som en enkelt verdi i databasen.
// - Bruker Hand.create() for ¨opprette en ny rad i databasen for hvert eksempel 
// - Skriver ut en melding til konsollen for hver innsetting og fullfører prosessenn med en call til process-exit()