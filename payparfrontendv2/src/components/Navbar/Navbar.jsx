import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const NAV_LINKS = [
  { to: '#como-funciona', label: 'Cómo funciona' },
  { to: '#zonas',         label: 'Zonas azules' },
  { to: '#beneficios',    label: 'Beneficios' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--gray-200)',
    }}>
      <div className="container-app" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--blue-600)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gray-900)', letterSpacing: '-0.02em' }}>
            PAY<span style={{ color: 'var(--blue-600)' }}>PAR</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <a key={l.to} href={l.to} style={{ fontSize: '0.9rem', color: 'var(--gray-600)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--gray-900)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--gray-600)'}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {user ? (
            <>
              <Link to={user.role === 'CLIENT' ? '/map' : '/dashboard'}
                style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--blue-600)', textDecoration: 'none' }}>
                {user.role === 'CLIENT' ? 'Mis vehículos' : 'Dashboard'}
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-700)', textDecoration: 'none' }}>
                Iniciar sesión
              </Link>
              <Link to="/auth?mode=register" className="btn btn-primary btn-sm">
                Registrarse
              </Link>
            </>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
            className="mobile-menu-btn"
            aria-label="Menú"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gray-700)" strokeWidth="2">
              {open
                ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>
                : <><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid var(--gray-200)', background: 'var(--white)', padding: '1rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {NAV_LINKS.map((l) => (
            <a key={l.to} href={l.to} onClick={() => setOpen(false)}
              style={{ fontSize: '1rem', color: 'var(--gray-700)', textDecoration: 'none', fontWeight: 500 }}>
              {l.label}
            </a>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid var(--gray-200)' }} />
          {user ? (
            <>
              <Link to={user.role === 'CLIENT' ? '/map' : '/dashboard'} onClick={() => setOpen(false)}
                style={{ fontSize: '1rem', color: 'var(--blue-600)', fontWeight: 600, textDecoration: 'none' }}>
                {user.role === 'CLIENT' ? 'Mis vehículos' : 'Dashboard'}
              </Link>
              <button onClick={() => { handleLogout(); setOpen(false); }} className="btn btn-secondary btn-md">
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/auth" onClick={() => setOpen(false)} className="btn btn-secondary btn-md">
                Iniciar sesión
              </Link>
              <Link to="/auth?mode=register" onClick={() => setOpen(false)} className="btn btn-primary btn-md">
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
