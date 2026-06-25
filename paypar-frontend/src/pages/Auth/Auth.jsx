import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import GoogleSignInButton from '../../components/ui/GoogleSignInButton';
import './auth.css';

const Auth = () => {
  const [mode,    setMode]    = useState('login'); // login | register
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const [form,    setForm]    = useState({
    email: '', password: '', firstName: '', lastName: '',
  });

  const { login } = useAuth();
  const navigate  = useNavigate();

  const goAfterLogin = (userData) => {
    navigate(userData.role === 'CLIENT' ? '/' : '/dashboard');
  };

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
    <div className="auth-container">
      <div className="auth-bg-effect" />

      <div className="auth-card">
        <h1 className="text-3xl font-bold mb-1 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          PAYPAR 🚗
        </h1>
        <p className="text-slate-400 mb-6 text-sm">
          {mode === 'login' ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta gratis'}
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        {/* Google primero — flujo más rápido para conductores */}
        <GoogleSignInButton onSuccess={handleGoogleSuccess} onError={setError} disabled={loading} />

        <div className="auth-divider"><span>o con tu correo</span></div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {mode === 'register' && (
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nombre"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Carlos"
                required
              />
              <Input
                label="Apellido"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Pérez"
                required
              />
            </div>
          )}

          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Mínimo 8 caracteres"
            required
          />

          <Button type="submit" loading={loading} className="w-full mt-2">
            {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
          </Button>
        </form>

        <button
          onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
          className="w-full mt-4 text-slate-400 hover:text-white text-sm transition-colors"
        >
          {mode === 'login'
            ? '¿No tienes cuenta? Regístrate'
            : '¿Ya tienes cuenta? Inicia sesión'}
        </button>
      </div>
    </div>
  );
};

export default Auth;
