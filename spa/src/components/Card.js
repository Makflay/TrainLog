import { useState } from 'react';
import style from './ui/Card.module.css';
import checkBtn from './ui/CheckButton.module.css'
import CardHeader from './CardHeader';
import ExerciseList from './ExerciseList';
import createExercise from '../api/createExercise';
import updateExerciseApi from '../api/updateExerciseApi';
import deleteExerciseApi from '../api/deleteExerciseApi';

function Card({ 
  data, onRemove, onUpdate, setWeek
}) {
  console.log('Card data', data)
  const [isEditing, setIsEditing] = useState(false);
  const [isAddNewEx, setIsAddNewEx] = useState(false);
  const [tempDay, setTempDay] = useState(data.day);
  const [tempMuscles, setTempMuscles] = useState(data.muscles);
  const [exerciseForm, setExerciseForm] = useState({
    name: '',
    weight: '',
    sets: '',
    reps: '',
  });

  const addExercise = async () => {
    if (!exerciseForm.name) return;
    const newExercise = {
      name: exerciseForm.name,
      planned: {
        weight: exerciseForm.weight,
        sets: exerciseForm.sets,
        reps: exerciseForm.reps,
      },
      done: [],
      previous: [],
    };
    const createdExercise = await createExercise(data._id, newExercise);
    
    setWeek(prevWeek => ({
      ...prevWeek,
      days: prevWeek.days.map(day =>
        day._id === data._id
          ? { ...day, exercises: [...day.exercises, createdExercise] }
          : day
      )
    }));

    setExerciseForm({ name: '', weight: '', sets: '', reps: '' });
    setIsAddNewEx(!isAddNewEx);
  };

  const updateExercise = async (exerciseId, updatedData) => {
    try {
      const updatedExercise = await updateExerciseApi(exerciseId, updatedData);
      console.log('updatedExercise', updatedExercise);

      setWeek(prevWeek => ({
        ...prevWeek,
        days: prevWeek.days.map(day =>
          day._id === data._id
            ? {
                ...day,
                exercises: day.exercises.map(ex =>
                  ex._id === exerciseId ? updatedExercise : ex
                )
              }
            : day
        )
      }));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteExercise = async (exerciseId) => {
    try {
      const deletedExercise = await deleteExerciseApi(exerciseId);
      setWeek(prevWeek => ({
        ...prevWeek,
        days: prevWeek.days.map(day =>
          day._id === data._id
            ? {
                ...day,
                exercises: day.exercises.filter(ex => ex._id !== deletedExercise.exerciseId)
              }
            : day
        )
      }));
    } catch (err) {
      console.error(err);
    }
  }

  const saveDay = () => {
    onUpdate({ day: tempDay, muscles: tempMuscles });
    setIsEditing(false);
  };

return (
    <div className={style.card}>
      {isEditing ? (
        <div>
          <input
            value={tempDay}
            onChange={(e) => setTempDay(e.target.value)}
            placeholder="Day"
          />
          <input
            value={tempMuscles}
            onChange={(e) => setTempMuscles(e.target.value)}
            placeholder="Muscle Group"
          />
          <button onClick={saveDay} className={checkBtn.check}></button>
        </div>
      ) : (
        <CardHeader
          day={data.day}
          muscles={data.muscles}
          onEdit={() => setIsEditing(true)}
        />
      )}

      <ExerciseList
        exercises={data.exercises}
        onUpdateExercise={updateExercise}
        onDeleteExercise={deleteExercise}
      />

      {
        isAddNewEx ? (
          <div>
            <input
              type="text"
              placeholder="Exercise name"
              value={exerciseForm.name}
              onChange={(e) => setExerciseForm({ ...exerciseForm, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Weight"
              value={exerciseForm.weight}
              onChange={(e) => setExerciseForm({ ...exerciseForm, weight: e.target.value })}
            />
            <input
              type="number"
              placeholder="Sets"
              value={exerciseForm.sets}
              onChange={(e) => setExerciseForm({ ...exerciseForm, sets: e.target.value })}
            />
            <input
              type="text"
              placeholder="Reps"
              value={exerciseForm.reps}
              onChange={(e) => setExerciseForm({ ...exerciseForm, reps: e.target.value })}
            />
            <button onClick={addExercise}>Add</button>
          </div>
        )
        :
        (
          <button onClick={() => {setIsAddNewEx(!isAddNewEx)}}>Add new exercise</button>
        )
      }

      <button onClick={onRemove}>
        Remove Day
      </button>
    </div>
  );
}

export default Card;