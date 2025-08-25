import { useState, useEffect } from 'react';
import styles from './ui/ExerciseItem.module.css';
import checkBtn from './ui/CheckButton.module.css';
import deleteBtn from './ui/DeleteButton.module.css';
import ExerciseTitle from './ExerciseTitle';
import ExerciseProgress from './ExerciseProgress';
import ExerciseHistory from './ExerciseHistory';

function ExerciseItem({
  exercise, updateExerciseItem, deleteExerciseItem, onUpdateDoneItem, onUpdatePreviousItem
}) {  

  const [isUpdateExercise, setIsUpdateExercise] = useState(false);
  const [exerciseForm, setExerciseForm] = useState({
    name: exercise.name,
    planned: {
      weight: exercise.planned.weight,
      sets: exercise.planned.sets,
      reps: exercise.planned.reps
    },
    done: exercise.done,
    previous: exercise.previous,
  });
  const [isUpdateDoneSets, setIsUpdateDoneSets] = useState(false);
  const [isUpdatePrevSets, setIsUpdatePrevSets] = useState(false);

  useEffect(() => {
    setExerciseForm({
      name: exercise.name,
      planned: {
        weight: exercise.planned.weight,
        sets: exercise.planned.sets,
        reps: exercise.planned.reps
      },
      done: exercise.done,
      previous: exercise.previous,
    });
  }, [exercise]);

  const saveExercise = () => {
    updateExerciseItem(exerciseForm);
    setIsUpdateExercise(false);
  }

  const updateDoneSet = () => {
    onUpdateDoneItem(exerciseForm.done);
    setIsUpdateDoneSets(false);
  };

  const handleDoneChange = (i, value) => {
    setExerciseForm(prev => {
      const newDone = [...prev.done];
      newDone[i] = Number(value);
      return { ...prev, done: newDone };
    });
  };

  const updatePrevSet = () => {
    console.log('updatePrevSet')
    onUpdatePreviousItem(exerciseForm.previous);
    setIsUpdatePrevSets(false);
  };

  const handlePrevChange = (i, value) => {
    setExerciseForm(prev => {
      const newDone = [...prev.previous];
      newDone[i] = Number(value);
      return { ...prev, previous: newDone };
    });
  };

  return (
    <div className={styles.exerciseItem}>

      {
        isUpdateExercise ? 
          (
            <div>
              <input
                value={exerciseForm.name}
                onChange={e => setExerciseForm({...exerciseForm, name: e.target.value})}
              />
              <input
                value={exerciseForm.planned.weight}
                onChange={e => setExerciseForm({
                  ...exerciseForm,
                  planned:{...exerciseForm.planned, weight: e.target.value}
                })}
              />
              <input
                value={exerciseForm.planned.sets}
                onChange={e => setExerciseForm({
                  ...exerciseForm, 
                  planned:{...exerciseForm.planned, sets: e.target.value}
                })}
              />
              <input
                value={exerciseForm.planned.reps}
                onChange={e => setExerciseForm({
                  ...exerciseForm,
                  planned:{...exerciseForm.planned, reps: e.target.value}
                })}
              />
              <input
                value={exerciseForm.done}
                onChange={e => setExerciseForm({...exerciseForm, done: e.target.value})}
              />
              <input
                value={exerciseForm.previous}
                onChange={e => setExerciseForm({...exerciseForm, previous: e.target.value})}
              />
              <button onClick={saveExercise} className={checkBtn.check}></button>
            </div>
          )
          :
          (
            <ExerciseTitle
              name={exercise.name}
              planned={exercise.planned}
              onEdit={() => setIsUpdateExercise(true)}
            />
          )
      }
      
      
      {/* Current progress */}
      {
        isUpdateDoneSets ? 
          (
            <div className={styles.inputRow}>
              <span>Done:</span>
                {exerciseForm.done.map((el, i) => (
                  <input
                    key={i}
                    type="number"
                    value={el}
                    onChange={e => handleDoneChange(i, e.target.value)}
                  />
                ))}
              <button onClick={updateDoneSet}>save</button>
            </div>
          )
          :
          (
            <ExerciseProgress
              done={exercise.done}
              onEdit={() => setIsUpdateDoneSets(true)}
            />
          )
      }
      {/* History */}
      {
        isUpdatePrevSets ? 
          (
            <div className={styles.inputRow}>
              <span>Previous:</span>
                {exerciseForm.previous.map((el, i) => (
                  <input
                    key={i}
                    type="number"
                    value={el}
                    onChange={e => handlePrevChange(i, e.target.value)}
                  />
                ))}
              <button onClick={updatePrevSet}>save</button>
            </div>
          )
          :
          (
            <ExerciseHistory
              previous={exercise.previous}
              onEdit={() => setIsUpdatePrevSets(true)}
            />
          )
      }
      <button onClick={deleteExerciseItem} className={deleteBtn.delete}>Delete Exercise</button>
    </div>
  );
}

export default ExerciseItem;