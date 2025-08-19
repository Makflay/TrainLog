const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  day: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Day',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  planned: {
    weight: String,
    sets: Number,
    reps: String
  },
  done: [Number],
  previous: [Number]
});

module.exports = mongoose.model('Exercise', exerciseSchema);