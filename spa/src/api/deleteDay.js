const API_URL = process.env.REACT_APP_API_URL;

export default async function deleteDay(id) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training/day/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) throw new Error('Failed to delete day');
  return res.json();
  } catch (err) {
    throw err;
  }
}