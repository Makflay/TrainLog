function ExerciseHistory({ previous }) {
  return (
    <p>Previous: {previous.join(", ")}</p>
  );
}

export default ExerciseHistory;