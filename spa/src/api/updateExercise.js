const API_URL = process.env.REACT_APP_API_URL;

export default async function updateExercise(exerciseId, updatedData) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training/exercise/update/${exerciseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update exercise');
    return data;
  } catch (err) {
    throw err;
  }
}