import ExerciseItem from './ExerciseItem';

function ExerciseList({ exercises }) {
  return (
    <div>
      {exercises.map((el, i) => (
        <ExerciseItem key={i} ex={el} />
      ))}
    </div>
  );
}

export default ExerciseList;