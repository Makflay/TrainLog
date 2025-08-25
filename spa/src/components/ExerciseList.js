import ExerciseItem from './ExerciseItem';
import styles from './ui/ExerciseList.module.css';

function ExerciseList({ exercises, onUpdateExercise }) {
  console.log('exercises', exercises)
  return (
    <div className={styles.exerciseList}>
      {exercises.map((el) => (
        <ExerciseItem
          key={el._id}
          exercise={el}
          onUpdate={(updatedEx) => onUpdateExercise(el._id, updatedEx)}
        />
      ))}
    </div>
  );
}

export default ExerciseList;