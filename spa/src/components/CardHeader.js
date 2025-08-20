import styles from './ui/CardHeader.module.css';
import editButton from './ui/SubmitButton.module.css';

function CardHeader({ day, muscles, onEdit }) {
  return (
    <div className={styles.cardHeader}>
      <h1>
        {day} - {muscles}
      </h1>
      <button onClick={onEdit} className={editButton.submit}>Edit</button>
    </div>
  );
}

export default CardHeader;