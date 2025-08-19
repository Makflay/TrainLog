const mongoose = require('mongoose');

const trainingWeekSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('trainingWeek', trainingWeekSchema)