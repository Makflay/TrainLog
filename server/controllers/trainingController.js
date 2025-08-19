const TrainingWeek = require('../models/trainingWeek');
const Day = require('../models/day');
const Exercise = require('../models/exercise');


exports.createDay = async (req, res) => {
  try {
    const { day, muscles } = req.body;

    const week = await TrainingWeek.findOne({ user: req.userId });
    if (!week) return res.status(404).json({ message: 'Week not found' });

    const newDay = await Day.create({ week: week._id, day, muscles, exercises: [] });
    week.days.push(newDay._id);
    await week.save();

    res.status(201).json(newDay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.createExercise = async (req, res) => {
  try {
    const { dayId } = req.params;
    const { name, planned, done = [], previous = [] } = req.body;

    const day = await Day.findById(dayId).populate('week');
    if (!day || String(day.week.user) !== String(req.userId)) {
      return res.status(404).json({ message: 'Day not found' });
    }

    const exercise = await Exercise.create({ day: day._id, name, planned, done, previous });
    day.exercises.push(exercise._id);
    await day.save();

    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}