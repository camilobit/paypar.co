import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="text-2xl font-black text-emerald-500">PAYPAR</Link>
        </div>
        <nav className="navbar-links">
          <a href="#buscar">Consultar placa</a>
          <a href="#funciona">Cómo funciona</a>
          <a href="#beneficios">Beneficios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        {user ? (
          <Link to="/dashboard" className="navbar-login">Dashboard</Link>
        ) : (
          <Link to="/auth" className="navbar-login">Iniciar sesión</Link>
        )}
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
      </div>
      {menuOpen && (
        <div className="mobile-menu">
          <a href="#buscar">Consultar placa</a>
          <a href="#funciona">Cómo funciona</a>
          <a href="#beneficios">Beneficios</a>
          {user ? (
            <Link to="/dashboard" className="mobile-login-btn">Dashboard</Link>
          ) : (
            <Link to="/auth" className="mobile-login-btn">Iniciar sesión</Link>
          )}
        </div>
      )}
    </header>
  );
};
export default Navbar;
