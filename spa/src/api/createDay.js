const API_URL = process.env.REACT_APP_API_URL;

export default async function createDay(day, muscles) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training/day/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      },
      body: JSON.stringify({ day: day, muscles: muscles }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || 'Failed to create day');
    return data;
  } catch (err) {
    throw err;
  }
}