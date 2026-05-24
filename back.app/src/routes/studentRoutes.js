const express = require('express');
const router = express.Router();
const Student = require('../model/Student');
const Group = require('../model/Groupe');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');

router.post('/', async (req, res) => {
  const { name, color } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Un nom complet est  requis !" });
  }

  try {
    const student = new Student({ name, color });
    await student.save();
    res.status(201).json({ notif: "Étudiant créé avec succès"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la création de l'étudiant" });
  }
});

router.get('/', async (req, res) => {
    try {
        const student = await Student.find()
        res.status(200).json(student)
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la récupération des groupes" })
    }
    
})

router.delete('/:id', authMiddleware, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Étudiant non trouvé" });
    }

    await Group.updateMany(
      { membres: id },
      { $pull: { membres: id } }
    );

    res.status(201).json({ message: "Étudiant supprimé avec succès" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression" });
  }
});

module.exports = router;
