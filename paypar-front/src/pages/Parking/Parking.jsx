import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import PlateInput from '../../components/ui/PlateInput';
import Button from '../../components/ui/Button';
import { formatCOP } from '../../data/mock';

const MOCK = { plate: 'ABC123', zone: 'Centro Histórico', entryTime: new Date(Date.now() - 45 * 60000), duration: 45, amount: 1875 };

const Parking = () => {
  const [params] = useSearchParams();
  const [step, setStep] = useState(params.get('plate') ? 'found' : 'search');
  const [loading, setLoading] = useState(false);

  const handleSearch = () => { setLoading(true); setTimeout(() => { setStep('found'); setLoading(false); }, 600); };

  return (
    <MainLayout noFooter>
      <div className="page-enter" style={{ maxWidth: 440, margin: '3rem auto', padding: '0 1.5rem' }}>
        {step === 'search' && (
          <>
            <h1 className="text-headline" style={{ marginBottom: '0.5rem' }}>Consultar ticket</h1>
            <p className="text-body" style={{ marginBottom: '1.5rem' }}>Ingresa tu placa para ver tu sesión activa.</p>
            <PlateInput onSearch={handleSearch} loading={loading} />
          </>
        )}
        {step === 'found' && (
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <span style={{ fontSize: '3rem' }}>🚗</span>
            <p className="plate" style={{ fontSize: '1.5rem', marginTop: '0.5rem', marginBottom: '0.25rem' }}>{MOCK.plate}</p>
            <p style={{ color: 'var(--gray-500)', marginBottom: '1.5rem' }}>{MOCK.zone}</p>
            <div style={{ textAlign: 'left', display: 'grid', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray-500)' }}>Entrada</span>
                <span>{MOCK.entryTime.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--gray-500)' }}>Duración</span>
                <span>{MOCK.duration} min</span>
              </div>
              <div className="divider" />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600 }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--blue-600)' }}>{formatCOP(MOCK.amount)}</span>
              </div>
            </div>
            <Button variant="success" size="lg" style={{ width: '100%' }}>Pagar ahora</Button>
            <button onClick={() => setStep('search')} style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--gray-400)', background: 'none', border: 'none', cursor: 'pointer' }}>
              ← Buscar otra placa
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Parking;
