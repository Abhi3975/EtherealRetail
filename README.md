# EtherealRetail 🌿

![EtherealHero](https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop)

> Nature, distilled. A full-stack, end-to-end e-commerce concept optimizing the digital storefront experience through sophisticated Mongoose schemas, programmatic algorithmic data filtering, and a bespoke "Bento Grid" React user interface.

## 🌟 Elite Architecture Features

- **Advanced Database Aggregation**: Uses deeply nested MongoDB/$group pipelines inside the `/api/analytics` routes to instantly render Admin KPIs.
- **Dynamic Programmatic Pagination**: The catalog APIs dynamically parse multi-parameter queries (`?category=Jackets&sort=price_desc&limit=10`) using Mongoose cursor operations (`.skip().limit()`).
- **Heavy Frontend Operations**: Implements React `Suspense` and `lazy()` boundary boundaries to aggressively code-split the router bundle, optimizing initial painting times.
- **Bcrypt Hash/Salting**: Pure cryptographic token storage within Mongoose `pre-save` hooking.
- **REST Autodocumentation**: Ships with an embedded `Swagger / OpenAPI` sandbox interface so any engineering team can play with the routes directly.

## 🛠️ Stack Architecture
- **Environment**: Node.js & Express.js (protected by `Helmet` and `Express Rate Limiters`)
- **Database**: MongoDB Atlas via `Mongoose`
- **Frontend**: Vite + React 18
- **Styling UI**: TailwindCSS + `framer-motion` for iOS-like transitions
- **Storage Box**: Multer interceptors wired asynchronously into Cloudinary APIs.

## 🚀 Getting Started

The platform utilizes a multi-stage deterministic Docker image for identical deployment behavior.

```bash
# Bring up the MongoDB service and the backend seamlessly
docker-compose up -d

# Spin up the development frontend separately
cd frontend
npm run dev
```

### Manual Mode
If you prefer not to use the orchestrated containers:
1. Fire up a local `mongod` process or inject a `.env` `MONGO_URI`.
2. `cd backend && npm install && node server.js`
3. `cd frontend && npm install && npm run dev`

---
*Built meticulously for an obsessive approach to digital retail.*
