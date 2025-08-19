const API_URL = process.env.REACT_APP_API_URL;

export default async function updateDay(id, data) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training/day/update/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ day: data.day, muscles: data.muscles }),
  });

  if (!res.ok) throw new Error('Failed to delete day');
  return res.json();
  } catch (err) {
    throw err;
  }
}