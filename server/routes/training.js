const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getDayExercise, createDay, deleteDay, createExercise
} = require('../controllers/trainingController');

router.get('/', authMiddleware, getDayExercise)
router.post('/day/create', authMiddleware, createDay);
router.delete('/day/:dayId', authMiddleware, deleteDay);

router.post('/exercise/create/:dayId', authMiddleware, createExercise);

module.exports = router;