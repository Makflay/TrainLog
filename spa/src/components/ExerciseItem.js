import { useState } from 'react';
import styles from './ui/ExerciseItem.module.css';
import ExerciseTitle from './ExerciseTitle';
import ExerciseProgress from './ExerciseProgress';
import ExerciseHistory from './ExerciseHistory';

function ExerciseItem({ exercise, onUpdate }) {
  console.log('ExerciseItem exercise', exercise)

  const [doneSets, setDoneSets] = useState(exercise.done.length ? exercise.done : []);
  const [prevSets, setPrevSets] = useState(exercise.previous.length ? exercise.previous : []);

  // update one set Done
  const updateDoneSet = (index, value) => {
    const newDone = [...doneSets];
    newDone[index] = parseInt(value) || 0;
    setDoneSets(newDone);
  };

  // update one set Previous
  const updatePrevSet = (index, value) => {
    const newPrev = [...prevSets];
    newPrev[index] = parseInt(value) || 0;
    setPrevSets(newPrev);
  };

  // Add new set
  const addDoneSet = () => {
    if (doneSets.length < 12) setDoneSets([...doneSets, 0]);
  };
  const addPrevSet = () => {
    if (prevSets.length < 12) setPrevSets([...prevSets, 0]);
  };

  // save updates
  const saveDone = () => onUpdate({ ...exercise, done: doneSets });
  const savePrev = () => onUpdate({ ...exercise, previous: prevSets });



  return (
    <div className={styles.exerciseItem}>
      <ExerciseTitle name={exercise.name} planned={exercise.planned} />
      {/* Current progress */}
      <div className="mt-2">
        <span>Done:</span>
        <div>
          {doneSets.map((val, i) => (
            <input
              key={i}
              type="number"
              value={val}
              onChange={(e) => updateDoneSet(i, e.target.value)}
            />
          ))}
          {doneSets.length < 12 && (
            <button onClick={addDoneSet}>
              + Set{`max 12`}
            </button>
          )}
        </div>
        <button onClick={saveDone}>Save Done</button>
      </div>
      <ExerciseProgress done={exercise.done} />

      {/* History */}
      <div>
        <span>Previous:</span>
        <div>
          {prevSets.map((val, i) => (
            <input
              key={i}
              type="number"
              value={val}
              onChange={(e) => updatePrevSet(i, e.target.value)}
            />
          ))}
          {prevSets.length < 12 && (
            <button onClick={addPrevSet}>
              + Set(max12)
            </button>
          )}
        </div>
        <button onClick={savePrev}>Save Previous</button>
      </div>
      <ExerciseHistory previous={exercise.previous} />
    </div>
  );
}

export default ExerciseItem;