import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import PlateInput from '../../components/ui/PlateInput';
import Button from '../../components/ui/Button';
import ZoneBadge from '../../components/ui/ZoneBadge';
import { useAuth } from '../../context/AuthContext';
import { MOCK_ZONES, formatCOP } from '../../data/mock';

const STEPS = [
  { num: '1', title: 'Encuentra un espacio', desc: 'Busca zonas azules cercanas con disponibilidad en tiempo real desde la app.' },
  { num: '2', title: 'Estaciona tu vehículo', desc: 'Llega a la zona, estaciona y registra el inicio desde tu celular.' },
  { num: '3', title: 'El tiempo corre', desc: 'Mientras estás estacionado, el valor se calcula automáticamente por minuto.' },
  { num: '4', title: 'Paga digital', desc: 'Al finalizar, paga con tarjeta, Nequi, Daviplata o efectivo. Sin filas.' },
];

const BENEFITS = [
  { icon: '💳', title: 'Sin efectivo', desc: 'Paga desde tu celular. Sin monedas, sin filas en caja.' },
  { icon: '⚡', title: 'Pago en segundos', desc: 'Finaliza tu sesión y paga en menos de 30 segundos.' },
  { icon: '📊', title: 'Historial digital', desc: 'Accede a todas tus sesiones y pagos anteriores.' },
  { icon: '🔒', title: 'Transacciones seguras', desc: 'Procesamos pagos con Wompi, la pasarela más usada en Colombia.' },
  { icon: '📍', title: 'Zonas en tiempo real', desc: 'Encuentra espacios disponibles cerca de ti al instante.' },
  { icon: '🏛', title: 'Regulación municipal', desc: 'Conectado con la alcaldía para un estacionamiento más ordenado.' },
];

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const navigate              = useNavigate();
  const { user, loginDemo }   = useAuth();

  const handleSearch = (plate) => {
    setError('');
    setLoading(true);
    setTimeout(() => {
      navigate(`/parking?plate=${plate}`);
      setLoading(false);
    }, 600);
  };

  return (
    <MainLayout>
      {/* ── HERO ──────────────────────────────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #F0FDF4 100%)',
        padding: 'clamp(3rem, 8vw, 6rem) 1.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -120, right: -120, width: 400, height: 400, borderRadius: '50%', background: 'rgba(37,99,235,0.04)' }} />
        <div style={{ position: 'absolute', bottom: -80, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'rgba(34,197,94,0.04)' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720, margin: '0 auto' }}>
          <div className="badge badge-blue" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
            Estacionamiento inteligente para tu ciudad
          </div>

          <h1 className="text-display" style={{ color: 'var(--gray-900)', marginBottom: '1.25rem' }}>
            Estaciona, paga y sigue
            <span style={{ color: 'var(--blue-600)' }}> sin filas</span>
          </h1>

          <p className="text-body" style={{ maxWidth: 560, margin: '0 auto 2.5rem', fontSize: '1.125rem' }}>
            PAYPAR digitaliza el estacionamiento urbano. Encuentra zonas azules, paga desde tu celular y olvídate del efectivo.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            <Button variant="primary" size="xl" onClick={() => navigate('/map')} icon="📍">
              Encontrar espacio
            </Button>
            <Button variant="secondary" size="xl" onClick={() => navigate('/session/start')} icon="🚗">
              Iniciar parqueadero
            </Button>
          </div>

          {/* Quick demo login */}
          {!user && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>
              ¿Quieres explorar?{' '}
              <button
                onClick={() => loginDemo('CLIENT')}
                style={{ color: 'var(--blue-600)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Entrar como demo
              </button>
            </p>
          )}
        </div>
      </section>

      {/* ── SEARCH ────────────────────────────────────── */}
      <section style={{ padding: '4rem 1.5rem', background: 'var(--white)' }} id="buscar">
        <div style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
          <p className="section-eyebrow">Consulta rápida</p>
          <h2 className="text-headline" style={{ marginBottom: '0.5rem' }}>¿Ya estás estacionado?</h2>
          <p className="text-body" style={{ marginBottom: '1.5rem' }}>Ingresa tu placa para ver tu sesión activa y pagar.</p>
          <PlateInput onSearch={handleSearch} loading={loading} />
          {error && <p style={{ color: 'var(--red-500)', fontSize: '0.875rem', marginTop: '0.75rem' }}>{error}</p>}
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--gray-50)' }} id="como-funciona">
        <div className="container-app">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-eyebrow">Cómo funciona</p>
            <h2 className="text-headline">Tan fácil como estacionar</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: 960, margin: '0 auto' }}>
            {STEPS.map((s) => (
              <div key={s.num} style={{ textAlign: 'center' }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'var(--blue-600)', color: 'var(--white)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1.125rem',
                  margin: '0 auto 1rem',
                }}>
                  {s.num}
                </div>
                <h3 style={{ fontWeight: 600, marginBottom: '0.5rem', color: 'var(--gray-900)' }}>{s.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ZONES PREVIEW ─────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--white)' }} id="zonas">
        <div className="container-app">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-eyebrow">Zonas azules</p>
            <h2 className="text-headline">Disponibilidad en tiempo real</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', maxWidth: 960, margin: '0 auto' }}>
            {MOCK_ZONES.slice(0, 4).map((z) => (
              <div key={z.id} className="card card-hover" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: 2 }}>{z.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{z.code} · {z.address}</p>
                  </div>
                  <ZoneBadge available={z.available} total={z.total} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>{z.available}/{z.total} espacios</span>
                  <span style={{ fontWeight: 700, color: 'var(--blue-600)', fontSize: '0.9rem' }}>{formatCOP(z.rate)}/hora</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button variant="secondary" size="lg" onClick={() => navigate('/map')}>
              Ver todas las zonas en el mapa
            </Button>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--gray-50)' }} id="beneficios">
        <div className="container-app">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p className="section-eyebrow">Beneficios</p>
            <h2 className="text-headline">¿Por qué PAYPAR?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: 960, margin: '0 auto' }}>
            {BENEFITS.map((b) => (
              <div key={b.title} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{b.icon}</span>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>{b.title}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--blue-600)', textAlign: 'center' }}>
        <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: 'var(--white)', marginBottom: '0.75rem' }}>
          ¿Tu municipio quiere modernizar el estacionamiento?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', maxWidth: 480, margin: '0 auto 2rem', fontSize: '1rem' }}>
          PAYPAR se integra con alcaldías para gestionar zonas azules de forma digital, transparente y eficiente.
        </p>
        <Button variant="secondary" size="xl" style={{ background: 'var(--white)', color: 'var(--blue-600)', border: 'none' }}>
          Solicitar demo para municipios
        </Button>
      </section>
    </MainLayout>
  );
};

export default Home;
