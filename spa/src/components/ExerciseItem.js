import { useState } from 'react';
import styles from './ui/ExerciseItem.module.css';
import ExerciseTitle from './ExerciseTitle';
import ExerciseProgress from './ExerciseProgress';
import ExerciseHistory from './ExerciseHistory';

function ExerciseItem({ exercise, onUpdate }) {
  console.log('exercise', exercise)

  const [doneSets, setDoneSets] = useState(exercise.done.length ? exercise.done : []);
  const [isUpdateDoneSets] = useState(false);
  const [prevSets, setPrevSets] = useState(exercise.previous.length ? exercise.previous : []);
  const [isUpdatePrevSets] = useState(false);

  const updateDataExercise = () => {

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
      <ExerciseTitle name={exercise.name} planned={exercise.planned} />
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
    </div>
  );
}

export default ExerciseItem;