const API_URL = process.env.REACT_APP_API_URL;

export default async function getDayExercise() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training`, {
      method: 'GET',
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}