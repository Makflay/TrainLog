import { useState } from 'react';
import CardHeader from './CardHeader';
import ExerciseList from './ExerciseList';
import createExercise from '../api/createExercise';

function Card({ 
  data, onRemove, onUpdate, setWeek
}) {
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


  // const onAddExercise = async (dayId, exercise) =>  {
  //   await addExercise(dayId, exercise);

  //   const data = await getDayExercise();
  //   setWeek(data);
  // }
  //onUpdateExercise={(exerciseId, newData) => updateExercise(card._id, exerciseId, newData)}

  const updateExercise = async (index, updatedEx) => {
    // const newExercises = [...data.exercises];
    // newExercises[index] = updatedEx;
    // onUpdate({ exercises: newExercises });
  };

  const deleteExercise = async () => {

  }

  const saveDay = () => {
    onUpdate({ day: tempDay, muscles: tempMuscles });
    setIsEditing(false);
  };

return (
    <div>
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
          <button onClick={saveDay}>Save</button>
        </div>
      ) : (
        <CardHeader
          day={data.day}
          muscles={data.muscles}
          onEdit={() => setIsEditing(true)}
        />
      )}

      <ExerciseList exercises={data.exercises} onUpdateExercise={updateExercise}/>

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
        Remove
      </button>
    </div>
  );
}

export default Card;