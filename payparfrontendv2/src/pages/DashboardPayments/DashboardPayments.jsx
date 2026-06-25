import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import { MOCK_HISTORY, formatCOP, formatDuration } from '../../data/mock';

const DashboardPayments = () => (
  <DashboardLayout>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Pagos</h1>
    <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '1.5rem' }}>Historial de pagos completados</p>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
      <StatCard title="Total recaudado" value={formatCOP(38920000)} icon="💰" color="blue" />
      <StatCard title="Pagos completados" value="324" icon="✅" color="green" />
      <StatCard title="Promedio por sesión" value={formatCOP(12000)} icon="📊" color="gray" />
    </div>
    <div className="card" style={{ overflow: 'hidden' }}>
      <table className="table-base">
        <thead><tr><th>Fecha</th><th>Placa</th><th>Zona</th><th>Duración</th><th>Monto</th><th>Método</th></tr></thead>
        <tbody>
          {MOCK_HISTORY.map((h) => (
            <tr key={h.id}>
              <td>{h.date}</td>
              <td><span className="plate" style={{ fontSize: '0.875rem' }}>{h.vehicle}</span></td>
              <td>{h.zone}</td>
              <td>{formatDuration(h.duration)}</td>
              <td style={{ fontWeight: 600 }}>{formatCOP(h.amount)}</td>
              <td><span className="badge badge-blue">{h.method}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </DashboardLayout>
);
export default DashboardPayments;
