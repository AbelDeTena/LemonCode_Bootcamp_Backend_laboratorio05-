# Bootcamp Backend [Documental] Laboratorio 4 🍋
![CI](https://github.com/AbelDeTena/LemonCode_Bootcamp_Backend_laboratorio04/actions/workflows/ci.yml/badge.svg)

# Backend Lab: Houses API

API REST en Node + Express con arquitectura por *pods* (houses), mappers Db→VM, mocks y tests mínimos con Vitest + Supertest.

## 🧰 Stack
- Node + Express
- TypeScript
- Vitest + Supertest
- Arquitectura por pods
- Middlewares 404 y error

## 🚀 Arranque
```bash
npm install
npm run dev        # desarrollo (ts-node-dev)
# http://localhost:3000
```

## 🐳 Docker (local)
Build:
```bash
docker build -t houses-api:dev .
```

## Docker image (GHCR)
```bash
docker pull ghcr.io/<usuario>/<repo>:latest
docker run --rm -p 3000:3000 ghcr.io/<usuario>/<repo>:latest
```

---

## 🔐 Configuración de entorno (.env)
Crea un archivo `.env` con, por ejemplo:

```env
NODE_ENV=development
PORT=3000
API_MOCK=false
MONGODB_URI=mongodb://localhost:27017/house-booking
```

- `API_MOCK=true` → la API usa **mocks en memoria** (sin Mongo).
- `API_MOCK=false` → la API usa **MongoDB** (necesitas tenerlo levantado).

> El *dump* usado para el seed está en `./seed/house-booking/` con:
> - `listingsAndReviews.bson`
> - `listingsAndReviews.metadata.json`

---

## 🗄️ MongoDB local con Docker (con seed)

### Scripts disponibles
En `package.json` hay scripts para trabajar con un contenedor Mongo minimalista:

- `mongo:up` — levanta Mongo con Docker Compose.
- `mongo:down` — para y elimina el contenedor.
- `mongo:seed` — restaura el *dump* de `./seed/house-booking` dentro de Mongo.
- `db:count` — sanity check: cuenta documentos en la colección.
- `db:reset` — **atajo**: `mongo:down` → `mongo:up` → `mongo:seed` → `db:count`.

### Uso recomendado (todo en uno)
```bash
npm run db:reset   # levanta mongo + restaura seed + muestra número de documentos
npm run dev        # arranca la API con API_MOCK=false
# GET http://localhost:3000/api/houses
```

### Uso paso a paso
```bash
npm run mongo:up
npm run mongo:seed
npm run db:count   # debería mostrar 5555
npm run dev
```

### Parar todo
```bash
npm run mongo:down
```

---

## 🧪 Tests
```bash
npm test
npm run test:watch
```

---

## 🔌 Endpoints principales
- `GET /api/houses?country=Spain&page=1&pageSize=10` → listado paginado (+filtro por país).
- `GET /api/houses/:id` → detalle de una casa.
- `POST /api/houses/:id/reviews`
  ```json
  { "author": "Abel", "comment": "Very nice!" }
  ```
  - `201` si crea, `400` si faltan campos, `404` si no existe la casa.

---

## 🛠️ Problemas típicos (y solución)
- **Lista vacía usando Mongo**
  - Asegúrate de `API_MOCK=false` en `.env`.
  - Ejecuta `npm run db:reset` y revisa que `db:count` imprime `5555`.
  - Confirma que la colección usada por el repositorio es **`listingsAndReviews`** (en minúsculas).

- **El seed no se restaura**
  - Revisa que existan `./seed/house-booking/listingsAndReviews.bson` y `./seed/house-booking/listingsAndReviews.metadata.json`.
  - Si ves “don’t know what to do with file …”, suele ser por **nombres distintos** (p. ej. mayúsculas/minúsculas) o ruta incorrecta.

- **Puerto 27017 ocupado**
  - Para procesos antiguos (WSL/Docker previos) o cambia el puerto en `docker-compose.yml`.

---

## ✅ CI
Repositorio con CI (GitHub Actions) que ejecuta tests y type-check en cada push.

---

¡Listo! 🚀
