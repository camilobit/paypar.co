import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import { useTimer } from '../../hooks/useTimer';
import { MOCK_ACTIVE_SESSION, formatCOP, calcAmount } from '../../data/mock';

const SessionActive = () => {
  const session = MOCK_ACTIVE_SESSION;
  const { minutes, display } = useTimer(session.startTime);
  const currentAmount = calcAmount(minutes, session.zone.rate);
  const navigate = useNavigate();
  const [ending, setEnding] = useState(false);

  const handleEnd = () => {
    setEnding(true);
    setTimeout(() => {
      navigate(`/payment?amount=${currentAmount}&zone=${session.zone.name}&plate=${session.vehicle.licensePlate}&duration=${minutes}`);
    }, 800);
  };

  return (
    <MainLayout noFooter>
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem', background: 'var(--gray-50)' }}>
        <div className="page-enter" style={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>

          {/* Pulse indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: '2rem' }}>
            <span style={{
              width: 10, height: 10, borderRadius: '50%', background: 'var(--green-500)',
              animation: 'pulse 2s ease infinite',
            }} />
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--green-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Sesión activa
            </span>
          </div>

          {/* THE SIGNATURE — Live counter */}
          <div style={{ marginBottom: '0.5rem' }}>
            <p className="session-counter">{display}</p>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-400)', marginBottom: '2rem' }}>
            horas : minutos : segundos
          </p>

          {/* Accumulating cost */}
          <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--gray-100)' }}>
              <span style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>Valor acumulado</span>
              <span className="session-counter-blue" style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
                {formatCOP(currentAmount)}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '0.625rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray-500)' }}>Vehículo</span>
                <span className="plate" style={{ color: 'var(--gray-900)' }}>{session.vehicle.licensePlate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray-500)' }}>Zona</span>
                <span style={{ color: 'var(--gray-900)', fontWeight: 500 }}>{session.zone.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray-500)' }}>Código</span>
                <span className="badge badge-blue">{session.zone.code}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray-500)' }}>Hora de inicio</span>
                <span style={{ color: 'var(--gray-900)', fontWeight: 500 }}>
                  {new Date(session.startTime).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray-500)' }}>Tarifa</span>
                <span style={{ color: 'var(--blue-600)', fontWeight: 600 }}>{formatCOP(session.zone.rate)}/hora</span>
              </div>
            </div>
          </div>

          <Button
            variant="danger" size="xl"
            style={{ width: '100%' }}
            loading={ending}
            onClick={handleEnd}
          >
            Finalizar estacionamiento
          </Button>

          <p style={{ fontSize: '0.8125rem', color: 'var(--gray-400)', marginTop: '1rem' }}>
            Al finalizar, se calculará el monto exacto y podrás elegir cómo pagar.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }
      `}</style>
    </MainLayout>
  );
};

export default SessionActive;
