import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import styles from './ui/Form.module.css'
import loginUser from '../api/loginUser';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

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
        const data = await loginUser(username, password);
        console.log('login is ok', data);

        login(data.token);
        navigate('/');
    } catch (err) {
        console.log(err.message);
        const newErrors = {};
        newErrors.api = err.message;
        setErrors(newErrors);
    }
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Sign in</h1>
      {errors.api && <p>{errors.api}</p>}
      <div>
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder='Login(your name)' type='text' />
        {errors.username && <p>{errors.username}</p>}
      </div>
      <div>
        <input value={password} onChange={e => setPassword(e.target.value)} placeholder='Password' type='password'/>
        {errors.password && <p>{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;