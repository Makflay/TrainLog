const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {createDay, createExercise} = require('../controllers/trainingController');

router.post('/days', authMiddleware, createDay);
router.post('/days/:dayId/exercises', authMiddleware, createExercise);

module.exports = router;