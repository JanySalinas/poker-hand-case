// Denme filen håndterer databasen på to måter:
// 1. Ved hjelp av mysql2 oppretter vi en tilkoblingspool for direkte spørringer.
// 2. Ved hjelp av Sequelize (et ORM) definerer vi en Hand-modellen og synkroniserer den med databasen.
// Valget om å bruke begge teknologiene kan skyldes at noen operasjoner kan kjøres med rå SQL (med pool);
// Mens Sequelize gir et enklere og mer objektorientert grensesnitt mot database - 
const mysql = require('mysql2/promise');
require('dotenv').config();

// Oppretter en tilkoblingspool for MYSQL slik at vi kan gjenbruke tilkoblinger og styre flere samtidige spørringer
// Dette forbedrer ytelsen og ressursutnyttelsen.
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = pool;

const { Sequelize, DataTypes } = require('sequelize');
// Laster miljøvariabler med informasjon om databasen fra .env filen.
require('dotenv').config();

// Setter opp en Sequelize-instans for å forenkle modellen og databasetilgangen.
// Ved å bruke Sequelize kan vi definerer modeller som representerer tabellene våre og unngå å skrive rå SQL.
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
    }
);

// Definerer 'Hand' - modellen med de nødvendige feltene.
// hand og analysis er definert som strenger og kan ikke være null
// playerId settes til unknown dersom verdien ikke er angitt - som feks en playerId, da blir det en playerTest.
const Hand = sequelize.define('Hand', {
    hands: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    analysis: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playerId: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'unknown'
    }
}, {
    tableName: 'hands',
    freezeTableName: true, // Hindrer at Sequelize automatisk flerer tabellnavnet forblir hands.
});

// Synkroniserer modellen med databasen.
// Dette oppretter tabellen dersom den ikke finnes, noe som forenkler initialiseringen.
sequelize.sync()
    .then(() => console.log('All tables created successfully.'))
    .catch(error => console.error('Error while creating tables:', error));

module.exports = { sequelize, Hand };

// Filen setter opp to tilnærminger for databasekommunikasjon: en ren tilkoblingspool via mysql2 for lavnivåoperasjoner, og en ORM Sequelize for objektorientert modellhåndtering.
// Dette designvalget gir fleksibilitet ved å kunne bruke direkte SQL-spørringer og en enklere modell-definisjon.
// Databasemodellen for Hand definerer med nødvendige felt og synkroniseres automatisk med databasen, noe som forenkler migreringsprosessen.