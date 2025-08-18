import { useState } from 'react';
import registerUser from '../api/registerUser';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validate = () => {
    const newErrors = {};

    if (!username) newErrors.username = 'Name is required';
    else if (username.length < 3) newErrors.username = 'Name must be min 3 characters';
    else if (username.length > 20) newErrors.username = 'Name must be max 20 characters';
    else if (!/^[a-zA-Z0-9]+$/.test(username)) newErrors.username = 'Only letters and numbers';

    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be min 6 characters';
    else if (password.length > 20) newErrors.password = 'Password must be max 20 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form is valid', { username, password });
      try {
        const data = await registerUser(username, password);
        console.log('is ok!', data.message);
        setMessage(data.message);
        localStorage.setItem('token', data.token);
    } catch (err) {
        console.log(err.message);
    }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder='Name' type='text' />
        {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
      </div>
      <div>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type='password'/>
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
      </div>
      <button type="submit">Register</button>
      {message.length > 0 ? <p>{message}</p> : null}
    </form>
  );
}

export default Register;