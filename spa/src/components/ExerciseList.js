import ExerciseItem from './ExerciseItem';
import styles from './ui/ExerciseList.module.css';

function ExerciseList({ exercises, onUpdateExercise, onDeleteExercise, onUpdateDone }) {
  console.log('exercises', exercises)
  return (
    <div className={styles.exerciseList}>
      {exercises.map((el) => (
        <ExerciseItem
          key={el._id}
          exercise={el}
          updateExerciseItem={(updatedEx) => onUpdateExercise(el._id, updatedEx)}
          deleteExerciseItem={() => onDeleteExercise(el._id)}
          onUpdateDoneItem={(updatedDone) => onUpdateDone(el._id, updatedDone)}
        />
      ))}
    </div>
  );
}

export default ExerciseList;