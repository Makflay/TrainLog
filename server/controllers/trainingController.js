const TrainingWeek = require('../models/trainingWeek');
const Day = require('../models/day');
const Exercise = require('../models/exercise');

exports.getDayExercise = async (req, res) => {
  try {
    const week = await TrainingWeek.findOne({ user: req.user.id })
      .populate({
        path: 'days',
        populate: { path: 'exercises' }
      });
    res.json(week);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.createDay = async (req, res) => {
  try {
    const { day, muscles } = req.body;
    const week = await TrainingWeek.findOne({ user: req.user.id });
    if (!week) return res.status(404).json({ message: 'Week not found' });

    const newDay = new Day({ week: week._id, day, muscles, exercises: [] });
    await newDay.save();
    week.days.push(newDay._id);
    await week.save();

    res.status(201).json(newDay);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.updateDay = async (req, res) => {
  try {
    const { muscles, day } = req.body;
    const dayDoc = await Day.findById(req.params.dayId).populate('week');
    if (!dayDoc || String(dayDoc.week.user) !== String(req.user.id)) {
      return res.status(404).json({ message: 'Day not found' });
    }

    if (muscles) dayDoc.muscles = muscles;
    if (day) dayDoc.day = day;
    await dayDoc.save();

    res.status(201).json(dayDoc);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.deleteDay = async (req, res) => {
  try {
    const dayDoc = await Day.findById(req.params.dayId).populate('week');
    if (!dayDoc || String(dayDoc.week.user) !== String(req.user.id)) {
      return res.status(404).json({ message: 'Day not found' });
    }

    await TrainingWeek.findByIdAndUpdate(dayDoc.week._id, {
      $pull: { days: dayDoc._id }
    });

    await Exercise.deleteMany({ day: dayDoc._id });

    await dayDoc.deleteOne();

    res.json({ dayId: dayDoc._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}



exports.createExercise = async (req, res) => {
  try {
    const { dayId } = req.params;
    const { name, planned} = req.body;

    const day = await Day.findById(dayId).populate('week');
    if (!day || String(day.week.user) !== String(req.user.id)) {
      return res.status(404).json({ message: 'Day not found' });
    }

    const setsCount = Number(planned?.sets) || 0;
    const done = Array(setsCount).fill(0);
    const previous = Array(setsCount).fill(0);

    const exercise = await Exercise.create({ 
      day: day._id, name, planned, done, previous
    });
    day.exercises.push(exercise._id);
    await day.save();

    res.status(201).json(exercise);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.updateExercise = async (req, res) => {
  try {
    const { name, planned, done, previous } = req.body;

    const exercise = await Exercise.findById(req.params.exerciseId).populate({
      path: 'day',
      populate: { path: 'week' }
    });

    if (!exercise || String(exercise.day.week.user) !== String(req.user.id)) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    if (name) exercise.name = name;
    if (planned) exercise.planned = planned;
    if (done) exercise.done = done;
    if (previous) exercise.previous = previous;

    await exercise.save();
    res.json(exercise);``
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}