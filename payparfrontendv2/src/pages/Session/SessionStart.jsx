import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import { MOCK_VEHICLES, MOCK_ZONES, formatCOP } from '../../data/mock';

const SessionStart = () => {
  const [params] = useSearchParams();
  const preZone = params.get('zone');
  const [vehicleId, setVehicleId] = useState(MOCK_VEHICLES[0]?.id || '');
  const [zoneId,    setZoneId]    = useState(preZone || '');
  const navigate = useNavigate();

  const zone    = MOCK_ZONES.find((z) => z.id === zoneId);
  const vehicle = MOCK_VEHICLES.find((v) => v.id === vehicleId);

  const handleStart = () => {
    // En producción: POST /tickets { licensePlate, parkingId }
    navigate('/session/active');
  };

  return (
    <MainLayout noFooter>
      <div className="page-enter" style={{ maxWidth: 480, margin: '2rem auto', padding: '0 1.5rem' }}>
        <h1 className="text-headline" style={{ marginBottom: '0.25rem' }}>Iniciar estacionamiento</h1>
        <p className="text-body" style={{ marginBottom: '2rem' }}>Selecciona tu vehículo y la zona donde vas a estacionar.</p>

        {/* Vehicle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p className="form-label" style={{ marginBottom: '0.5rem' }}>Vehículo</p>
          {MOCK_VEHICLES.length === 0 ? (
            <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
              <p className="text-caption">No tienes vehículos registrados.</p>
              <Button variant="secondary" size="sm" onClick={() => navigate('/vehicles')} style={{ marginTop: '0.5rem' }}>
                Agregar vehículo
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {MOCK_VEHICLES.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setVehicleId(v.id)}
                  className="card"
                  style={{
                    padding: '0.875rem 1rem', cursor: 'pointer',
                    borderColor: vehicleId === v.id ? 'var(--blue-600)' : 'var(--gray-200)',
                    background: vehicleId === v.id ? 'var(--blue-50)' : 'var(--white)',
                    transition: 'all 0.15s',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{v.type === 'CAR' ? '🚗' : v.type === 'MOTORCYCLE' ? '🏍' : '🚙'}</span>
                  <div style={{ flex: 1 }}>
                    <p className="plate" style={{ fontSize: '1rem' }}>{v.licensePlate}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{v.brand} {v.model}</p>
                  </div>
                  {vehicleId === v.id && <span style={{ color: 'var(--blue-600)', fontWeight: 700 }}>✓</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zone */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p className="form-label" style={{ marginBottom: '0.5rem' }}>Zona</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {MOCK_ZONES.filter((z) => z.available > 0).map((z) => (
              <div
                key={z.id}
                onClick={() => setZoneId(z.id)}
                className="card"
                style={{
                  padding: '0.875rem 1rem', cursor: 'pointer',
                  borderColor: zoneId === z.id ? 'var(--blue-600)' : 'var(--gray-200)',
                  background: zoneId === z.id ? 'var(--blue-50)' : 'var(--white)',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--gray-900)', fontSize: '0.9375rem' }}>{z.name}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{z.code} · {z.address}</p>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--blue-600)', fontSize: '0.875rem' }}>{formatCOP(z.rate)}/h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        {vehicle && zone && (
          <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', background: 'var(--gray-50)' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>Resumen</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--gray-500)' }}>Vehículo</span>
              <span className="plate" style={{ color: 'var(--gray-900)' }}>{vehicle.licensePlate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.375rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--gray-500)' }}>Zona</span>
              <span style={{ color: 'var(--gray-900)', fontWeight: 500 }}>{zone.name}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--gray-500)' }}>Tarifa</span>
              <span style={{ color: 'var(--blue-600)', fontWeight: 700 }}>{formatCOP(zone.rate)}/hora</span>
            </div>
          </div>
        )}

        <Button
          variant="success" size="xl"
          style={{ width: '100%' }}
          disabled={!vehicleId || !zoneId}
          onClick={handleStart}
        >
          Iniciar estacionamiento
        </Button>
      </div>
    </MainLayout>
  );
};

export default SessionStart;
