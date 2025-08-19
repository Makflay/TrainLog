import ExerciseItem from './ExerciseItem';

function ExerciseList({ exercises }) {
  console.log('ExerciseList exercises', exercises)
  return (
    <div>
      ExerciseList
      {exercises.map((el, i) => (
        <ExerciseItem key={i} exercise={el} />
      ))}
      ExerciseList
    </div>
  );
}

export default ExerciseList;