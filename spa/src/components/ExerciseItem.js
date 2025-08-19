import ExerciseTitle from './ExerciseTitle';
import ExerciseProgress from './ExerciseProgress';
import ExerciseHistory from './ExerciseHistory';

function ExerciseItem({ exercise }) {
  return (
    <div>
      <ExerciseTitle name={exercise.name} planned={exercise.planned} />
      <ExerciseProgress done={exercise.done} />
      <ExerciseHistory previous={exercise.previous} />
    </div>
  );
}

export default ExerciseItem;