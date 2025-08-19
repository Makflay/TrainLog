import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { isAuth, loading } = useContext(AuthContext);
  console.log('isAuth Protected', isAuth)
  if (loading) {
    return <p>Loading...</p>;
  }
  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;