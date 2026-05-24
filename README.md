# TeamUS — Générateur de Groupes équitables

*Nous, en équipe.* — Application fullstack pour former des groupes équitables et aléatoires, sans conflits et sans favoritisme.

---

## Contexte & Problème résolu

Dans ma classe , la formation des groupes de TP était source de tensions : certains étudiants se retrouvaient toujours ensemble, d'autres étaient mis de côté. J'ai créé **TeamUS** pour résoudre ce problème — un tirage aléatoire équitable, accessible à toute la classe via un simple lien partagé. Plus de conflits, plus de favoritisme : on est tous dans la même équipe.

---

## Fonctionnalités

### Côté utilisateur
- Rejoindre la session via un lien partagé
- Saisir son nom et choisir une couleur personnalisée pour sa carte
- Voir les groupes générés après le tirage

### Côté admin
- Tableau de bord protégé par authentification
- Lancer le tirage en définissant le nombre de membres par groupe
- Relancer le tirage avec un nombre de membres différent
- Supprimer des membres de la liste

---

## Stack technique

| Côté | Technologies |
|------|-------------|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express |
| Base de données | MongoDB |
| Algorithme | Fisher-Yates shuffle |

---

## Algorithme de mélange — Fisher-Yates

Le tirage utilise l'algorithme **Fisher-Yates** (aussi appelé Knuth shuffle), qui garantit une distribution parfaitement uniforme : chaque permutation possible des membres a exactement la même probabilité d'être générée.

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

## Lancer le projet en local

### Prérequis
- Node.js >= 16
- MongoDB (local ou Atlas)

### Installation

```bash
# Cloner le repo
git clone https://github.com/eabxrry/TeamUS.git
cd TeamUS

# Backend
cd back.app
npm install
cp .env.example .env   # renseigner MONGO_URL et JWT_SECRET
npm start

# Frontend (dans un autre terminal)
cd client.front
npm install
npm run dev
```

### Variables d'environnement (`.env`)

```
MONGO_URL=mongodb://localhost:27017/teamus
JWT_SECRET=ton_secret
PORT=3000
```

---

## Structure du projet

```
teamus.app/
├── client.front/          # React + Tailwind
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── layout/
│       ├── pages/
│       ├── routes/
│       ├── store/
│       └── utils/
├── back.app/          # Express + MongoDB
│   ├── config/
│   └── middleware/
│   ├── model/
│   ├── routes/
└── README.md
```

---

## Ce que j'ai appris

- Conception d'une API REST avec Express et MongoDB
- Gestion de l'authentification admin (JWT)
- Implémentation d'un algorithme de distribution équitable
- Communication frontend/backend avec React + axios

---

## 👨‍💻 Auteur

Projet personnel développé pour répondre à un besoin réel de ma classe.
