function ExerciseProgress({ done }) {
  return (
    <p>Done: {done.join(", ")}</p>
  );
}

export default ExerciseProgress;