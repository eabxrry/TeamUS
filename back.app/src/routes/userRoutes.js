const express = require('express');
const router = express.Router();
const User = require('../model/User');



// router.post('/',  async (req, res) => {
//     try {
//         const user = await User.create(req.body);
//         res.json({
//             name: user.username,
//             email: user.email,
//             role: user.role
//         });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });


// router.delete('/:id', authMiddleware, async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Utilisateur supprimé' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });

module.exports = router;
