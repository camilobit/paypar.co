import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import GoogleSignInButton from '../../components/ui/GoogleSignInButton';

const Auth = () => {
  const [params] = useSearchParams();
  const [mode,    setMode]    = useState(params.get('mode') === 'register' ? 'register' : 'login');
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [form,    setForm]    = useState({ email: '', password: '', firstName: '', lastName: '' });

  const { login } = useAuth();
  const navigate  = useNavigate();

  const goAfterLogin = (u) => navigate(u.role === 'CLIENT' ? '/map' : '/dashboard');

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = mode === 'login'
        ? await api.login({ email: form.email, password: form.password })
        : await api.register(form);
      login(res.data.token, res.data.user);
      goAfterLogin(res.data.user);
    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (idToken) => {
    setError('');
    setLoading(true);
    try {
      const res = await api.googleAuth({ idToken });
      login(res.data.token, res.data.user);
      goAfterLogin(res.data.user);
    } catch (err) {
      setError(err.message || 'No se pudo iniciar sesión con Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--gray-50)' }}>
      {/* Left — Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none', marginBottom: '2rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--gray-900)' }}>PAY<span style={{ color: 'var(--blue-600)' }}>PAR</span></span>
          </Link>

          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem', color: 'var(--gray-900)' }}>
            {mode === 'login' ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}
          </h1>
          <p className="text-body" style={{ marginBottom: '1.75rem' }}>
            {mode === 'login' ? 'Ingresa a tu cuenta PAYPAR' : 'Regístrate para empezar a usar PAYPAR'}
          </p>

          {error && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{error}</div>}

          <GoogleSignInButton onSuccess={handleGoogleSuccess} onError={setError} disabled={loading} />

          <div className="divider-label" style={{ margin: '1.25rem 0' }}>o con tu correo</div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {mode === 'register' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <Input label="Nombre" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Carlos" required />
                <Input label="Apellido" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Pérez" required />
              </div>
            )}
            <Input label="Correo electrónico" name="email" type="email" value={form.email} onChange={handleChange} placeholder="correo@ejemplo.com" required />
            <Input label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Mínimo 8 caracteres" required />
            <Button type="submit" loading={loading} className="btn-primary btn-lg" style={{ width: '100%', marginTop: '0.5rem' }}>
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </Button>
          </form>

          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
            {mode === 'login' ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button
              onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              style={{ color: 'var(--blue-600)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {mode === 'login' ? 'Regístrate' : 'Inicia sesión'}
            </button>
          </p>
        </div>
      </div>

      {/* Right — Visual panel (hidden on mobile) */}
      <div style={{
        flex: 1, background: 'var(--blue-600)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '3rem', color: 'var(--white)',
      }} className="auth-visual">
        <div style={{ maxWidth: 380, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🅿️</div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Estacionamiento inteligente
          </h2>
          <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
            Encuentra espacios, paga sin filas y contribuye a una ciudad más organizada. PAYPAR transforma la movilidad urbana.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .auth-visual { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Auth;
