import { useState } from 'react';
import styles from './ui/ExerciseItem.module.css';
import checkBtn from './ui/CheckButton.module.css';
import deleteBtn from './ui/DeleteButton.module.css';
import ExerciseTitle from './ExerciseTitle';
import ExerciseProgress from './ExerciseProgress';
import ExerciseHistory from './ExerciseHistory';

function ExerciseItem({ exercise, updateExerciseItem }) {  

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
  const [doneSets, setDoneSets] = useState(exercise.done.length ? exercise.done : []);
  const [isUpdateDoneSets] = useState(false);
  const [prevSets, setPrevSets] = useState(exercise.previous.length ? exercise.previous : []);
  const [isUpdatePrevSets] = useState(false);

  const saveExercise = () => {
    updateExerciseItem(exerciseForm);
    setIsUpdateExercise(false);
  }

  const removeExercise = () => {

  }

  // update one set Done
  const updateDoneSet = (index, value) => {
    console.log('updateDoneSet')
    // const newDone = [...doneSets];
    // newDone[index] = parseInt(value) || 0;
    // setDoneSets(newDone);
  };

  // update one set Previous
  const updatePrevSet = (index, value) => {
    console.log('updatePrevSet')
    // const newPrev = [...prevSets];
    // newPrev[index] = parseInt(value) || 0;
    // setPrevSets(newPrev);
  };

  // Add new set
  const addDoneSet = () => {
    if (doneSets.length < 12) setDoneSets([...doneSets, 0]);
  };
  const addPrevSet = () => {
    if (prevSets.length < 12) setPrevSets([...prevSets, 0]);
  };

  // save updates
  const saveDone = () => {
    console.log('saveDone')
    //onUpdate({ ...exercise, done: doneSets });
  }
  const savePrev = () => {
    console.log('savePrev');
    //onUpdate({ ...exercise, previous: prevSets });
  } 



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
                {doneSets.map((val, i) => (
                  <input
                    key={i}
                    type="number"
                    value={val}
                    onChange={(e) => updateDoneSet(i, e.target.value)}
                  />
                ))}
              <button onClick={saveDone}>save</button>
            </div>
          )
          :
          (<ExerciseProgress done={exercise.done} />)
      }
      {/* History */}
      {
        isUpdatePrevSets ? 
          (
            <div className={styles.inputRow}>
              <span>Previous:</span>
                {prevSets.map((val, i) => (
                  <input
                    key={i}
                    type="number"
                    value={val}
                    onChange={(e) => updatePrevSet(i, e.target.value)}
                  />
                ))}
              <button onClick={savePrev}>save</button>
            </div>
          )
          :
          (
            <ExerciseHistory previous={exercise.previous} />
          )
      }
      <botton className={deleteBtn.delete}>Delete Exercise</botton>
    </div>
  );
}

export default ExerciseItem;