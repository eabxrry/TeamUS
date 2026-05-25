# TeamUS — Fair Group Generator

*Us, as a team.* — A fullstack app to form fair, random groups without conflicts or favoritism.

---

## Context & Problem solved

In my class, forming lab groups was always a source of tension — some students always ended up together while others were left out. I built TeamUS to fix this: a fair random draw, accessible to the whole class through a single shared link. No more conflicts, no more favoritism. We're all on the same team.

---

## Features

**Student side**
- Join the session via a shared link
- Enter your name and pick a custom color for your card
- See the generated groups after the draw

**Admin side**
- Authentication-protected dashboard
- Launch the draw by setting the number of members per group
- Re-run the draw with a different group size
- Remove members from the list

---

## Tech stack

| Side | Technologies |
|------|-------------|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB |
| Algorithm | Fisher-Yates shuffle |

---

## Shuffling algorithm — Fisher-Yates

The draw uses the **Fisher-Yates** algorithm (also known as the Knuth shuffle), which guarantees a perfectly uniform distribution — every possible permutation of members has exactly the same probability of being generated.

```js
function fisherYatesShuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
```

---

## Run locally

Requirements: Node.js >= 16, MongoDB (local or Atlas)

```bash
git clone https://github.com/eabxrry/TeamUS.git
cd TeamUS

# Backend
cd back.app
npm install
cp .env.example .env   # fill in MONGO_URL and JWT_SECRET
npm start

# Frontend (in a separate terminal)
cd client.front
npm install
npm run dev
```

### Environment variables (`.env`)

```
MONGO_URL=mongodb://localhost:27017/teamus
JWT_SECRET=your_secret
PORT=3000
```

---

## Project structure

```
teamus.app/
├── client.front/        # React + Tailwind
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       ├── routes/
│       ├── store/
│       └── utils/
├── back.app/            # Express + MongoDB
│   ├── config/
│   ├── middleware/
│   ├── model/
│   └── routes/
└── README.md
```

---

## What I learned

- Building a REST API with Express and MongoDB
- Admin authentication with JWT
- Implementing a fair distribution algorithm
- Frontend/backend communication with React + Axios

---

## Author

Personal project built to solve a real problem in my class.
