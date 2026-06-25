import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import BarChart from '../../components/ui/BarChart';
import OccupancyRing from '../../components/ui/OccupancyRing';
import { useAuth } from '../../context/AuthContext';
import { MOCK_DASHBOARD_STATS as S, MOCK_CHART_DATA, MOCK_ACTIVE_TICKETS, formatCOP, formatDuration } from '../../data/mock';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>
          Buen día, {user?.firstName}
        </h1>
        <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)' }}>
          {new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard title="Recaudo hoy" value={formatCOP(S.recaudoHoy)} icon="💰" color="blue" trend={{ up: true, label: '+12% vs ayer' }} />
        <StatCard title="Recaudo mes" value={formatCOP(S.recaudoMes)} icon="📊" color="green" />
        <StatCard title="Vehículos activos" value={S.vehiculosActivos} icon="🚗" color="amber" />
        <StatCard title="Tickets hoy" value={S.ticketsHoy} icon="🎟" color="gray" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>Recaudo semanal</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--gray-400)', marginBottom: '1.25rem' }}>Últimos 7 días</p>
          <BarChart data={MOCK_CHART_DATA} height={140} />
        </div>
        <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <OccupancyRing value={S.ocupacionPromedio} />
          <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginTop: '1rem', textAlign: 'center' }}>Promedio general</p>
          <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', textAlign: 'center' }}>Zona más activa: {S.zonaMasActiva}</p>
        </div>
      </div>

      {/* Active tickets */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--gray-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Vehículos activos ahora</p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-400)' }}>{MOCK_ACTIVE_TICKETS.length} sesiones en curso</p>
          </div>
          <span className="badge badge-green">En vivo</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="table-base">
            <thead>
              <tr><th>Placa</th><th>Zona</th><th>Tiempo</th><th>Operador</th></tr>
            </thead>
            <tbody>
              {MOCK_ACTIVE_TICKETS.map((t) => {
                const mins = Math.floor((Date.now() - new Date(t.entryTime)) / 60000);
                return (
                  <tr key={t.id}>
                    <td><span className="plate" style={{ fontSize: '0.9rem' }}>{t.plate}</span></td>
                    <td style={{ color: 'var(--gray-700)' }}>{t.zone}</td>
                    <td>
                      <span className={`badge ${mins > 120 ? 'badge-red' : mins > 60 ? 'badge-amber' : 'badge-green'}`}>
                        {formatDuration(mins)}
                      </span>
                    </td>
                    <td style={{ color: 'var(--gray-500)' }}>{t.operator}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 2fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Dashboard;
