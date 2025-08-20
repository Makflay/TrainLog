import ExerciseItem from './ExerciseItem';
import styles from './ui/ExerciseList.module.css';

function ExerciseList({ exercises, onUpdateExercise }) {
  return (
    <div className={styles.exerciseList}>
      {exercises.map((el, i) => (
        <ExerciseItem
          key={i}
          exercise={el}
          onUpdate={(updatedEx) => onUpdateExercise(i, updatedEx)}
        />
      ))}
    </div>
  );
}

export default ExerciseList;