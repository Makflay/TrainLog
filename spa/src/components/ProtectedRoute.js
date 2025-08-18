import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuth = false; //Boolean(localStorage.getItem('token'));
  return isAuth ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;