import ExerciseItem from './ExerciseItem';
import styles from './ui/ExerciseList.module.css';

function ExerciseList({ exercises, onUpdateExercise, onDeleteExercise }) {
  console.log('exercises', exercises)
  return (
    <div className={styles.exerciseList}>
      {exercises.map((el) => (
        <ExerciseItem
          key={el._id}
          exercise={el}
          updateExerciseItem={(updatedEx) => onUpdateExercise(el._id, updatedEx)}
          deleteExerciseItem={() => onDeleteExercise(el._id)}
          
        />
      ))}
    </div>
  );
}

export default ExerciseList;