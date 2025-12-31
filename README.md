# snackify 

snackify is a full-stack food recommendation prototype that suggests recipes based on the ingredients a user already has. instead of asking *“what should i cook?”*, snackify asks *“what’s in your fridge?”* and works from there.

this project focuses on **logic, api design, and deployment**, rather than being a fully scaled consumer product.

---

## features

* ingredient-based recipe recommendations
* veg / non-veg preference filtering
* relevance scoring based on ingredient match ratio
* recipe directions and external recipe links
* missing ingredient detection
* instant buy links for missing ingredients (blinkit & instamart)
* user authentication (register & login)
* deployed frontend + backend

---

## recommendation logic (core highlight)

snackify uses a scoring-based algorithm:

* user ingredients are normalized (trimmed + lowercased)
* recipes are filtered by food preference
* each recipe is scored based on ingredient overlap
* stricter matching is applied when multiple ingredients are provided
* top 3 most relevant recipes are returned
* unmatched ingredients are surfaced as “ingredients you might need to buy”

this logic runs fully on the backend and is exposed via a clean api.

---

## tech stack

### frontend

* react
* react router
* axios
* css

### backend

* node.js
* express
* postgresql (neon db)
* jwt authentication
* bcrypt for password hashing

### deployment

* frontend: vercel
* backend: render
* database: neon (postgresql)

---

## project structure (simplified)

```bash
snackify/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── data/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── data/
│   │   └── config/
```

---

## known limitations (intentional)

* recipe data is currently static
* newly submitted recipe ideas are not persisted after server restarts
* email verification / 2fa is not enabled in production

### why?

this project is a **prototype built to demonstrate engineering skills**, not a production-scale app. persistence and advanced auth can be added easily with a dedicated recipe database and production email service.

---

## design decisions

* avoided over-engineering for a first full-stack prototype
* prioritized recommendation logic over secondary features
* kept data static to stay within free-tier database limits
* focused on deployability and real-world debugging experience

---

## setup (local)

### backend

```bash
cd backend
npm install
npm run dev
```

### frontend

```bash
cd frontend
npm install
npm run dev
```

---

## final note

snackify is a **full-stack prototype** built to showcase:

* backend logic
* api integration
* database usage
* authentication
* deployment troubleshooting

this project represents real engineering tradeoffs and real deployment challenges, solved end-to-end.

