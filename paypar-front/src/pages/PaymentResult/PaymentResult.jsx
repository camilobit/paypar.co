import { useSearchParams, Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';

const STATUS_MAP = {
  COMPLETED: { icon: '✅', title: '¡Pago exitoso!', desc: 'Tu sesión fue pagada correctamente. Ya puedes retirar tu vehículo.', color: 'var(--green-600)' },
  PENDING:   { icon: '⏳', title: 'Pago en proceso', desc: 'Estamos confirmando tu pago. Puede tardar unos segundos.', color: 'var(--amber-500)' },
  FAILED:    { icon: '❌', title: 'Pago rechazado', desc: 'El pago no pudo procesarse. Intenta con otro método.', color: 'var(--red-500)' },
};

const PaymentResult = () => {
  const [params] = useSearchParams();
  const status   = params.get('status') || 'COMPLETED';
  const config   = STATUS_MAP[status] || STATUS_MAP.COMPLETED;

  return (
    <MainLayout noFooter>
      <div className="page-enter" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
        <div style={{ textAlign: 'center', maxWidth: 380 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{config.icon}</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: '0.5rem' }}>{config.title}</h1>
          <p style={{ color: 'var(--gray-500)', lineHeight: 1.6, marginBottom: '2rem' }}>{config.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link to="/history" className="btn btn-primary btn-lg" style={{ textDecoration: 'none' }}>Ver mis sesiones</Link>
            <Link to="/" className="btn btn-ghost btn-lg" style={{ textDecoration: 'none' }}>Volver al inicio</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentResult;
