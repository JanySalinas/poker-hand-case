// Jeg importerer Hand modellen definert med Sequelize fra db-konfigurasjonen.
// Dette gir oss tilgang til Orm-funksjonaliteten for å utføre databaseoperasjoner på en objektorientert måte.
const { Hand } = require('../db/db');

// Funksjon: saveHand 
// Hvordan den fungerer:
// - Tar imot en poker hånd array, analyse og playerId.
// - Konverterer hånd-arrayet til en streng kan lagres i databasen.
// - Bruker Hand.create() fra Sequelize for å opprette en ny post i hands - tabellen.

// Hvorfor: 
// - Ved å bruke Sequelize for å opprette posten slipper vi å skrive rå SQL 
// - Koden blir mer lesbar, og operasjonen er enklere å teste.
exports.saveHand = async (hand, analysis, playerId) => {
    const handString = hand.join(','); // Konverterer pokerhånd-array til en kommaseparert streng.
    // Bruker Sequelize sin create-metode for å lagre data.
    await Hand.create({
        hands: handString,
        analysis,
        playerId
    });
};

// Funksjon: getAllHands
//Hvordan den fungerer:
// - Henter alle postene fra hands-tabellen.
// - Sorterer resultatet i synkende rekkefølge etter id for å få den nyeste posten først.

// Hvorfor:
// - Bruk av Sequelize sin findAll-metode forenkler databasetilgangen ved å skjule SQL-detaljer.
// - Gjør koden lettere å vedlikeholde og forstå.

exports.getAllHands = async () => {
    // Returnerer alle lagrede hender, sortert med nyeste først.
    return await Hand.findAll({ order: [['id', 'DESC']] });
};

// Filen bruker Sequelize for håndtere databaseoperasjoner i en objektorientert stil.
// Funksjonen saveHand konverterer en pokerhånd array til en streng og lagrer den sammen med analyse og spiller-id
// Funksjonen getAllHands henter alle poster fra databasen, sortert slik at den nyeste kommer først.
// Valget om å bruke Sequelize gjør koden renere og enklere å teste fordi vi slipper å skrive rå SQL.