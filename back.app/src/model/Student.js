const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  color: { type: String, required: true, default: 'blue' },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);