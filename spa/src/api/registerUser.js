const API_URL = process.env.REACT_APP_API_URL;
export default async function registerUser(username, password) {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'registerUser err');

    return data;
  } catch (err) {
    throw err;
  }
}