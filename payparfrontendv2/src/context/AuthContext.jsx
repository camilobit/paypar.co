import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { MOCK_USER } from '../data/mock';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('paypar_token');

    // DEMO MODE: si no hay token pero hay flag de demo, cargamos mock user
    if (!token) {
      const demoMode = localStorage.getItem('paypar_demo');
      if (demoMode) {
        setUser(JSON.parse(demoMode));
      }
      setLoading(false);
      return;
    }

    api.getProfile()
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem('paypar_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('paypar_token', token);
    setUser(userData);
  };

  // Demo login para mostrar sin backend
  const loginDemo = (role = 'CLIENT') => {
    const demoUser = { ...MOCK_USER, role };
    localStorage.setItem('paypar_demo', JSON.stringify(demoUser));
    setUser(demoUser);
  };

  const logout = () => {
    localStorage.removeItem('paypar_token');
    localStorage.removeItem('paypar_demo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginDemo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
};
