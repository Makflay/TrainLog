function ExerciseTitle({ name, planned }) {
  return (
    <p>
      {name} ({planned.weight}) {planned.sets} sets, {planned.reps} reps
    </p>
  );
}

export default ExerciseTitle;