import { FaPen } from 'react-icons/fa';
import penBtn from './ui/PenButton.module.css';

function ExerciseProgress({ done, onEdit }) {
  return (
    <div>
      <span>Done: {done.join(", ")}</span>
      <span
        className={penBtn.penBtn}
        role="button"
        onClick={onEdit}
      >
        <FaPen />
      </span>
    </div>

  );
}

export default ExerciseProgress;