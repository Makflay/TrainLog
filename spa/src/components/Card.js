import CardHeader from './CardHeader';
import ExerciseList from './ExerciseList';
import ExerciseHistory from './ExerciseHistory';

function Card({ data, onRemove }) {
  return (
    <div>
      <CardHeader day={data.day} muscles={data.muscles} />
      <ExerciseList exercises={data.exercises} />
      <button onClick={onRemove}>Remove</button>
    </div>
  );
}

export default Card;