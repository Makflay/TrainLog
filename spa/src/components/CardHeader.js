function CardHeader({ day, muscles, onEdit }) {
  return (
    <div>
      CardHeader
      <h2>
        {day} - {muscles}
      </h2>
      <button onClick={onEdit}>Edit</button>
      CardHeader
    </div>
  );
}

export default CardHeader;