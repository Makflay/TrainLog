import { FaPen } from 'react-icons/fa';
import penBtn from './ui/PenButton.module.css';

function ExerciseProgress({ done }) {
  return (
    <div>
      <span>Done: {done.join(", ")}</span>
      <span
        className={penBtn.penBtn}
        role="button"
      >
        <FaPen />
      </span>
    </div>

  );
}

export default ExerciseProgress;