const API_URL = process.env.REACT_APP_API_URL;

export default async function updateDay(id, newData) {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_URL}/training/day/update/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }, 
    body: JSON.stringify({ day: newData.day, muscles: newData.muscles }),
  });
  const data = await res.json();
  console.log('data update Day', data);
  if (!res.ok) throw new Error('Failed to delete day');
  
  return data;
  } catch (err) {
    throw err;
  }
}