const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  week: { type: mongoose.Schema.Types.ObjectId, ref: 'TrainingWeek', required: true },
  day: { type: String, required: true },
  muscles: { type: String, required: true }
});

module.exports = mongoose.model('Day', daySchema);