import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import { formatCOP, formatDuration, PAYMENT_METHODS } from '../../data/mock';

const Payment = () => {
  const [params] = useSearchParams();
  const amount   = Number(params.get('amount'))   || 5000;
  const zone     = params.get('zone')             || 'Centro Histórico';
  const plate    = params.get('plate')            || 'ABC123';
  const duration = Number(params.get('duration')) || 45;

  const [method,  setMethod]  = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePay = () => {
    setLoading(true);
    // En producción: POST /payments { ticketId, method }
    // Si method === CARD, abrir widget de Wompi con data de checkout
    setTimeout(() => navigate('/payment-result?status=COMPLETED'), 1200);
  };

  return (
    <MainLayout noFooter>
      <div className="page-enter" style={{ maxWidth: 440, margin: '2rem auto', padding: '0 1.5rem' }}>
        <h1 className="text-headline" style={{ marginBottom: '0.25rem' }}>Confirmar pago</h1>
        <p className="text-body" style={{ marginBottom: '2rem' }}>Revisa el resumen y selecciona tu método de pago.</p>

        {/* Summary card */}
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '0.625rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--gray-500)' }}>Vehículo</span>
              <span className="plate" style={{ color: 'var(--gray-900)' }}>{plate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--gray-500)' }}>Zona</span>
              <span style={{ color: 'var(--gray-900)', fontWeight: 500 }}>{zone}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--gray-500)' }}>Duración</span>
              <span style={{ color: 'var(--gray-900)', fontWeight: 500 }}>{formatDuration(duration)}</span>
            </div>
            <div className="divider" style={{ margin: '0.5rem 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Total a pagar</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--blue-600)' }}>{formatCOP(amount)}</span>
            </div>
          </div>
        </div>

        {/* Payment methods */}
        <p className="form-label" style={{ marginBottom: '0.5rem' }}>Método de pago</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {PAYMENT_METHODS.map((m) => (
            <div
              key={m.value}
              onClick={() => setMethod(m.value)}
              className="card"
              style={{
                padding: '0.875rem 1rem', cursor: 'pointer',
                borderColor: method === m.value ? 'var(--blue-600)' : 'var(--gray-200)',
                background: method === m.value ? 'var(--blue-50)' : 'var(--white)',
                transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '1.25rem' }}>{m.icon}</span>
              <span style={{ flex: 1, fontWeight: 500, color: 'var(--gray-900)', fontSize: '0.9375rem' }}>{m.label}</span>
              {method === m.value && <span style={{ color: 'var(--blue-600)', fontWeight: 700 }}>✓</span>}
            </div>
          ))}
        </div>

        <Button
          variant="success" size="xl"
          style={{ width: '100%' }}
          disabled={!method}
          loading={loading}
          onClick={handlePay}
        >
          Pagar {formatCOP(amount)}
        </Button>

        <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textAlign: 'center', marginTop: '1rem', lineHeight: 1.5 }}>
          Procesado de forma segura por Wompi. Al pagar aceptas los términos de servicio de PAYPAR.
        </p>
      </div>
    </MainLayout>
  );
};

export default Payment;
