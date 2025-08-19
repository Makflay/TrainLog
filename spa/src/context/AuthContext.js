import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuth(!!token);
    setLoading(false);
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setIsAuth(true); // <-- state update
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};