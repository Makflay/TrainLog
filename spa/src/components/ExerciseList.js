import ExerciseItem from './ExerciseItem';

function ExerciseList({ exercises, onUpdateExercise }) {
  console.log('ExerciseList exercises', exercises)
  return (
    <div>
      ExerciseList
      {exercises.map((el, i) => (
        <ExerciseItem
          key={i}
          exercise={el}
          onUpdate={(updatedEx) => onUpdateExercise(i, updatedEx)}
        />
      ))}
      ExerciseList
    </div>
  );
}

export default ExerciseList;