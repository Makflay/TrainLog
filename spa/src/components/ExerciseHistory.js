import { FaPen } from 'react-icons/fa';
import penBtn from './ui/PenButton.module.css';

function ExerciseHistory({ previous }) {
  return (
    <div>
      <span>Previous: {previous.join(", ")}</span>
      <span
        className={penBtn.penBtn}
        role="button"
      >
        <FaPen />
      </span>
    </div>

  );
}

export default ExerciseHistory;