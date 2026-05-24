const express = require('express');
const router = express.Router();
const Groupe = require('../model/Groupe')
const Student = require('../model/Student')

router.get("/",
   async (req, res) => {
  try {
    const [ groupes, students ] = await Promise.all([
      Groupe.find().populate('membres'),
      Student.find()

    ]);
      
    res.status(200).json({
      groupes,
      students
    })

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

