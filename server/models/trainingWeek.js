const mongoose = require('mongoose');

const trainingWeekSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  days: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Day' }]
});

module.exports = mongoose.model('TrainingWeek', trainingWeekSchema)