const API_URL = process.env.REACT_APP_API_URL;

export default async function deleteExerciseApi(exerciseId) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training/exercise/${exerciseId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to delete exercise');
    return data;
  } catch (err) {
    throw err;
  }
}