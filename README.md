# Film-API

Ett enkelt REST API för att hantera filmer, byggt som del av kursmomentet Inl 2 - API. Stödjer alla CRUD-operationer samt filtrering på genre.

## Funktioner

- **Lista alla filmer**
- **Filtrera filmer på genre** (t.ex. sci-fi, drama, komedi)
- **Hämta en specifik film** via id
- **Skapa en ny film**
- **Uppdatera en befintlig film**
- **Radera en film**

## Teknikstack

- **Backend:** Node.js, Express
- **Datalagring:** JSON-fil (`data/movies.json`)
- **Tester:** Jest + Supertest
- **Dokumentation:** Swagger (swagger-ui-express + swagger-jsdoc)

## Datamodell

Varje film lagras som ett objekt i `data/movies.json`:

```json
{
  "id": 1,
  "titel": "Interstellar",
  "genre": "sci-fi",
  "ar": 2014,
  "regissor": "Christopher Nolan",
  "betyg": 8.7
}
```

## Kom igång

### Förutsättningar

- Node.js installerat

### 1. Klona repot

```bash
git clone <repo-url>
cd api-filmer
```

### 2. Installera beroenden

```bash
npm install
```

### 3. Starta servern

```bash
node index.js
```

API:et körs på `http://localhost:4000`.

### 4. Kör testerna

```bash
npx jest
```

### 5. Utforska API-dokumentationen

Öppna `http://localhost:4000/api-docs` i webbläsaren för en interaktiv Swagger-dokumentation där du kan testa varje endpoint direkt.

## API-endpoints

| Metod  | Endpoint             | Beskrivning                              |
|--------|------------------------|-------------------------------------------|
| GET    | `/movies`              | Listar alla filmer                        |
| GET    | `/movies/:genre`       | Filtrerar filmer på genre                 |
| GET    | `/movies/id/:id`       | Hämtar en specifik film                   |
| POST   | `/movies`               | Skapar en ny film                         |
| PUT    | `/movies/id/:id`       | Uppdaterar en befintlig film               |
| DELETE | `/movies/id/:id`       | Raderar en film                           |

### Exempel: skapa en film

```bash
curl -X POST http://localhost:4000/movies \
  -H "Content-Type: application/json" \
  -d '{"titel": "Dune", "genre": "sci-fi", "ar": 2021, "regissor": "Denis Villeneuve", "betyg": 8.0}'
```

### Exempel: filtrera på genre

```bash
curl http://localhost:4000/movies/sci-fi
```

## Felhantering

Varje endpoint returnerar:
- `404` om en specifik film inte hittas
- `500` med felmeddelande om datafilen inte kan läsas eller skrivas

## Projektstruktur

```
api-filmer/
  data/
    movies.json
  tests/
    movies.test.js
  index.js
  README.md
```
