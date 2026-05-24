
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const { requireAdmin, authMiddleware } = require('../middleware/authMiddleware');
const JWT_SECRET = !process.env.JWT_SECRET ? () => { throw new Error('JWT_SECRET manquant') } : process.env.JWT_SECRET;


// router.post('/register', async (req, res) => {
//   try {
//      const { username, password } = req.body;
//     const userExist = await User.findOne({ username });
//     if (userExist) return res.status(400).json({ message: 'Utilisateur déjà existant' });
//     const user = new User({
//       username,
//       password,   
//     });
//     await user.save();

//      res.status(201).json({
//       message: "Inscription réussie",
//       user: { name: user.username,
//         email: user.email,
//         role: user.role 
//      },
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Utilisateur non trouvé' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Mot de passe incorrect' });

    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '2h' });


    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 2*3600000, 
    });


    res.status(200).json({ message: 'Connexion réussie' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/check', authMiddleware, requireAdmin, (req, res) => {
  res.status(200).json({ authenticated: true});
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({ message: "Deconnexion réussie" });
});

module.exports = router;
