import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import ZoneBadge from '../../components/ui/ZoneBadge';
import Button from '../../components/ui/Button';
import { MOCK_ZONES, formatCOP } from '../../data/mock';

const Map = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const filtered = filter === 'all' ? MOCK_ZONES
    : filter === 'available' ? MOCK_ZONES.filter((z) => z.available > 0)
    : MOCK_ZONES.filter((z) => z.available === 0);

  return (
    <MainLayout noFooter>
      <div style={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
        {/* Sidebar list */}
        <div style={{ width: 380, background: 'var(--white)', borderRight: '1px solid var(--gray-200)', overflow: 'auto', flexShrink: 0 }} className="map-sidebar">
          <div style={{ padding: '1.25rem 1.25rem 0.75rem', borderBottom: '1px solid var(--gray-100)', position: 'sticky', top: 0, background: 'var(--white)', zIndex: 1 }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--gray-900)' }}>Zonas azules</h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>Villavicencio, Meta</p>
            <div style={{ display: 'flex', gap: 4 }}>
              {[['all', 'Todas'], ['available', 'Disponibles'], ['full', 'Llenas']].map(([v, l]) => (
                <button key={v} onClick={() => setFilter(v)} className={`btn btn-sm ${filter === v ? 'btn-primary' : 'btn-ghost'}`}>{l}</button>
              ))}
            </div>
          </div>

          <div style={{ padding: '0.5rem' }}>
            {filtered.map((z) => (
              <div
                key={z.id}
                onClick={() => setSelected(z)}
                style={{
                  padding: '1rem', borderRadius: 10, cursor: 'pointer',
                  marginBottom: 4,
                  background: selected?.id === z.id ? 'var(--blue-50)' : 'transparent',
                  border: selected?.id === z.id ? '1px solid var(--blue-600)' : '1px solid transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (selected?.id !== z.id) e.currentTarget.style.background = 'var(--gray-50)'; }}
                onMouseLeave={(e) => { if (selected?.id !== z.id) e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9375rem', color: 'var(--gray-900)' }}>{z.name}</p>
                  <ZoneBadge available={z.available} total={z.total} />
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: 8 }}>{z.address}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>{z.available}/{z.total} espacios</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--blue-600)' }}>{formatCOP(z.rate)}/h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map area */}
        <div style={{ flex: 1, background: '#E8F0FE', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
            <p style={{ fontWeight: 600, color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Mapa interactivo</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', maxWidth: 320, margin: '0 auto 1.5rem' }}>
              Aquí se mostrará Google Maps con los marcadores de zonas azules en tiempo real.
            </p>
            {selected && (
              <div className="card" style={{ padding: '1.25rem', textAlign: 'left', maxWidth: 300, margin: '0 auto' }}>
                <p style={{ fontWeight: 600, marginBottom: 4 }}>{selected.name}</p>
                <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginBottom: 8 }}>{selected.address}</p>
                <p style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--blue-600)', marginBottom: '1rem' }}>{formatCOP(selected.rate)}/hora</p>
                <Button
                  variant="primary" size="md" style={{ width: '100%' }}
                  disabled={selected.available === 0}
                  onClick={() => navigate(`/session/start?zone=${selected.id}`)}
                >
                  {selected.available > 0 ? 'Iniciar estacionamiento' : 'Zona llena'}
                </Button>
              </div>
            )}
          </div>

          {/* Mock markers */}
          {MOCK_ZONES.map((z, i) => (
            <div
              key={z.id}
              onClick={() => setSelected(z)}
              style={{
                position: 'absolute',
                top: `${20 + (i * 15) % 60}%`,
                left: `${15 + (i * 20) % 70}%`,
                width: 32, height: 32, borderRadius: '50%',
                background: z.available === 0 ? 'var(--red-500)' : z.available < 5 ? 'var(--amber-500)' : 'var(--green-500)',
                color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 700, cursor: 'pointer',
                boxShadow: 'var(--shadow-lg)',
                border: selected?.id === z.id ? '3px solid var(--blue-600)' : '3px solid white',
                transition: 'transform 0.15s',
                transform: selected?.id === z.id ? 'scale(1.2)' : 'scale(1)',
              }}
              title={z.name}
            >
              {z.available}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .map-sidebar { width: 100% !important; position: absolute; bottom: 0; left: 0; right: 0; height: 50vh; z-index: 10; border-right: none !important; border-top: 1px solid var(--gray-200); border-radius: 16px 16px 0 0; }
        }
      `}</style>
    </MainLayout>
  );
};

export default Map;
