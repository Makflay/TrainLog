function ExerciseList({ exercises }) {
  return (
    <div>
      {exercises.map((el, i) => (
        <div key={i}>{el}</div>
      ))}
    </div>
  );
}

export default ExerciseList;