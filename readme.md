# Poker Hands Case

## Introduksjon  
Denne casen er en applikasjon for håndtering av pokerhender. Den inneholder:
- Generering, stokking og analyse av pokerhender (logikk i `pokerService.js`).
- En Express-server som eksponerer API-endepunkter (kontrollert via `pokerController.js`).
- Lagres og hentes data via en Sequelize-modell definert i `db/db.js` og brukt i `handModel.js`.
- Et frontend-grensesnitt (statisk HTML/CSS/JS i mappen `public`) for å generere en ny pokerhånd.
- Mulighet for testing og utvikling ved å kjøre seed-data med `seed.js`.

## Oppsett og Installering

### Forutsetninger  
- Node.js (prosjektet bygger med Node 22-alpine i Docker)
- Docker og Docker Compose (for containerisert kjøring)
- MySQL (brukes sammen med Docker Compose)

### Miljøvariabler  
Prosjektet bruker en `.env`-fil for å lagre konfigurasjoner. Eksempel på innhold:
```properties
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=admin
DB_NAME=pokerdb
```

### Installering via NPM  
1. Klon prosjektet.
2. Kjør:
    ```bash
    npm install
    ```
   Dette laster ned alle nødvendige avhengigheter.
   
### Databasen  
Databasetilkoblingen settes opp to måter:
1. En MySQL-tilkoblingspool via `mysql2/promise` for direkte spørringer.
2. Sequelize for en ORM-basert modellhåndtering (se `db/db.js`).

### Seed Data  
For testing og utvikling kan du kjøre seed-filen for å popluere databasen med eksempeldatasett:
```bash
node seed.js
```

## Kjøre Applikasjonen

### Lokalt uten Docker  
Etter installasjon, start applikasjonen med:
```bash
npm start
```
Appen kjører som standard på [http://localhost:3000](http://localhost:3000).

### Med Docker  
#### Dockerfile  
Prosjektet har en Dockerfile som:
- Bygger basert på `node:22-alpine`
- Setter arbeidskatalog løsning til `/app`
- Installerer avhengigheter og kopierer kildekoden
- Eksponerer port 3000 og starter applikasjonen med `npm start`

#### Docker Compose  
Du kan starte både applikasjon og MySQL-database med Docker Compose. Eksempel:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DB_HOST=db
      - DB_USER=root
      - DB_PASSWORD=admin
      - DB_NAME=pokerdb
    depends_on:
      - db
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: admin
      MYSQL_DATABASE: pokerdb
    ports:
      - "3307:3306"
    volumes:
      - mysql-data:/var/lib/mysql

volumes:
  mysql-data:
```

For å starte med Docker Compose, kjør:
```bash
docker-compose up --build
```
Dette vil hente alle nødvendige bilder, bygge applikasjonen, og starte både API og database.

## Testing med Postman

Du kan bruke Postman for å teste API-endepunktene. Her er noen eksempler:

- **Hente tidligere hender:**  
  Send en GET-forespørsel til:  
  [http://localhost:3000/api/poker/previous-hands](http://localhost:3000/api/poker/previous-hands)

- **Generere en ny hånd:**  
  Send en POST-forespørsel til:  
  [http://localhost:3000/api/poker/generate-hand](http://localhost:3000/api/poker/generate-hand)  
  Denne ruten genererer en hånd uten å sende med en playerId (dvs. bruker "unknown" som testspiller).

- **Sammenligne hender:**  
  Send en POST-forespørsel til:  
  [http://localhost:3000/api/poker/compare-hands](http://localhost:3000/api/poker/compare-hands)  
  Eksempel på JSON-payload (kan enten spesifisere playerId for hver hånd eller sammenligne arbitære hender):
  
  ```json eksemple for testing.
    {
    "hands": [
        ["2r", "3k", "4s", "6h", "7r"],
        ["2r", "2k", "5s", "7h", "8r"],
        ["3r", "3k", "3s", "7h", "8r"]
        ]
    }
    I dette eksempelet vil den 3 hånden få flest score, og vinne.

## API Endepunkter  
Prosjektets API-endepunkter inkluderer:
- **POST /api/poker/generate-hand**: Genererer en ny pokerhånd  
- **GET /api/poker/previous-hands**: Henter alle tidligere lagrede hender  
- **POST /api/poker/compare-hands**: Sammenligner to eller flere hender og returnerer vinneren

## Filstruktur og Viktige Filer  
- **app.js**: Hovedentry point for Express-serveren. Konfigurerer middleware, ruter og starter serveren.
- **pokerController.js**: Håndterer HTTP-forespørsler for pokerfunksjonalitet.
- **pokerService.js**: Inneholder logikken for generering og evaluering av pokerhender.
- **db/db.js**: Setter opp databasen med både en direkte MySQL-tilkoblingspool og en Sequelize-ORM.
- **models/handModel.js**: Håndterer databaseoperasjoner for pokerhender.
- **seed.js**: Populerer databasen med forhåndsdefinerte datasett for testing.
- **Dockerfile** og **docker-compose.yml**: For containerisering av applikasjonen og databasen.
- **.env**: Miljøvariabler (brukes for konfigurasjon uten å hardkode verdier).

## Testing og Utvikling  
- Bruk `nodemon` for automatisk omstart under utvikling.
- Seed data kan kjøres for å sette opp en forhåndsdefinert database.

## Oppsummering  
Denne README gir en oversikt over prosjektets formål, installasjonsinstruksjoner, oppsett for både lokalt utviklingsmiljø og containerisert kjøring med Docker, samt en gjennomgang av API-endepunktene og filstrukturen. Dette gjør det enklere for både utviklere og eventuelle bidragsytere å forstå og sette opp prosjektet.

## Oppsummering av Docker:
Jeg merket at selv om appen og databasen startet som forventet i Docker, ble ikke dataene lagret som de skulle. Appen koblet til databasen og opprettet tabeller, men dataene forsvant. Jeg tror det skyldtes at jeg manglet en vedvarende lagring volume eller at databasen ikke ble riktig initialisert. Det var en nyttig erfaring, og jeg har lært hvor viktig det er å teste databaseintegrasjon grundig spesielt i Docker-miljøer.
Jeg prøvde å sette db som host, men det må være en annen plass jeg ikke har klart å få med meg for å kunne initialisere dette, jeg tar dette med meg videre til andre eventuelle docker prosjekter og er mer nøye med å få satt det opp riktig. 

