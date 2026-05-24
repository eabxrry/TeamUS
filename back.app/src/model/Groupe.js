const mongoose = require('mongoose');

const groupeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  membres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Groupe', groupeSchema);