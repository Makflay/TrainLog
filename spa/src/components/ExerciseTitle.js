import { useState } from 'react';
import styles from './ui/CardHeader.module.css';
import editButton from './ui/SubmitButton.module.css';

function ExerciseTitle({ name, planned, onEdit }) {
  const [isUpdate, setIsUpdate] = useState(false);

  return (
    <div className={styles.cardHeader}>
      <p>{name} - {planned.weight}kg {planned.sets} sets, {planned.reps} reps</p>
      <button onClick={onEdit} className={editButton.submit}>Edit</button>
    </div>

  );
}

export default ExerciseTitle;