import DashboardLayout from '../../layouts/DashboardLayout';
import ZoneBadge from '../../components/ui/ZoneBadge';
import { MOCK_ZONES, formatCOP } from '../../data/mock';

const DashboardZones = () => (
  <DashboardLayout>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Zonas Azules</h1>
    <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '1.5rem' }}>Zonas de estacionamiento urbano regulado</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
      {MOCK_ZONES.map((z) => (
        <div key={z.id} className="card card-hover" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{z.name}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{z.code} · {z.address}</p>
            </div>
            <ZoneBadge available={z.available} total={z.total} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--gray-400)' }}>{z.available}/{z.total} espacios</span>
            <span style={{ fontWeight: 700, color: 'var(--blue-600)' }}>{formatCOP(z.rate)}/h</span>
          </div>
        </div>
      ))}
    </div>
  </DashboardLayout>
);
export default DashboardZones;
