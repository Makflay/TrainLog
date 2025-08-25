const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getDayExercise, createDay, updateDay, deleteDay, createExercise, updateExercise
} = require('../controllers/trainingController');

router.get('/', authMiddleware, getDayExercise)
router.post('/day/create', authMiddleware, createDay);
router.put('/day/update/:dayId', authMiddleware, updateDay);
router.delete('/day/:dayId', authMiddleware, deleteDay);

router.post('/exercise/create/:dayId', authMiddleware, createExercise);
router.put('/exercise/update/:exerciseId', authMiddleware, updateExercise);

module.exports = router;