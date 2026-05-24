const express = require('express');
const router = express.Router();
const Student = require('../model/Student');
const Group = require('../model/Groupe');
const { authMiddleware, requireAdmin } = require('../middleware/authMiddleware');

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function repartirEnGroupes(students, maxMembers) {
  if (maxMembers <= 0) {
    throw new Error("Le nombre maximum de membres doit être supérieur à 0");
  }

  const shuffled = shuffleArray(students);
  const groupes = [];
  let groupeIndex = 0;

  shuffled.forEach((eleve) => {
    if (!groupes[groupeIndex]) {
      groupes[groupeIndex] = { membres: [] };
    }
    groupes[groupeIndex].membres.push(eleve._id);

    if (groupes[groupeIndex].membres.length >= maxMembers) {
      groupeIndex++;
    }
  });

  return groupes;
}


router.post('/generate', authMiddleware, requireAdmin, async (req, res) => {
  const { maxMembers } = req.body;

  if (!maxMembers || typeof maxMembers !== 'number' || maxMembers <= 0) {
    return res.status(400).json({ message: "maxMembers doit être un nombre > 0" });
  }

  try {

    const students = await Student.find();

    if (students.length === 0) {
      return res.status(400).json({ message: "Aucun étudiant trouvé pour créer des groupes" });
    }

    const groupesData = repartirEnGroupes(students, maxMembers);

    await Group.deleteMany({});


    const groupesCrees = [];

    for (let i = 0; i < groupesData.length; i++) {
      const groupe = new Group({
        name: `Groupe ${i + 1}`,
        membres: groupesData[i].membres,
      });
      await groupe.save();
      groupesCrees.push(groupe);
    }

    const groupesAvecMembres = await Group.find().populate('membres');

    res.status(200).json({
      message: "Groupes générés avec succès",
      groupes: groupesAvecMembres,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la génération des groupes" });
  }
});

router.get('/', async (req, res) => {
  try {
    const groups = await Group.find().populate('students');
    res.status(200).json(groups);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la récupération des groupes" });
  }
});

router.delete('/:id', authMiddleware, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      return res.status(404).json({ message: "Groupe non trouvé" });
    }
    res.status(200).json({ message: "Groupe supprimé avec succès", deletedGroup });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur lors de la suppression du groupe" });
  }
});

module.exports = router;
