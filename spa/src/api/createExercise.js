const API_URL = process.env.REACT_APP_API_URL;

export default async function createExercise(dayId, exercise) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training/exercise/create/${dayId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({...exercise}),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to create day');
    return data;
  } catch (err) {
    throw err;
  }
}