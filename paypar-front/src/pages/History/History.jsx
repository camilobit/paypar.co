import MainLayout from '../../layouts/MainLayout';
import { MOCK_HISTORY, formatCOP, formatDuration } from '../../data/mock';

const METHOD_ICONS = { CARD: '💳', NEQUI: '📱', DAVIPLATA: '📱', CASH: '💵' };

const History = () => (
  <MainLayout noFooter>
    <div className="container-app page-enter" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <h1 className="text-headline" style={{ marginBottom: '0.25rem' }}>Historial</h1>
      <p className="text-body" style={{ marginBottom: '1.5rem' }}>Todas tus sesiones de estacionamiento y pagos.</p>

      {MOCK_HISTORY.length === 0 ? (
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📋</p>
          <p style={{ fontWeight: 600, color: 'var(--gray-900)' }}>Sin historial todavía</p>
          <p className="text-body">Tus sesiones de estacionamiento aparecerán aquí.</p>
        </div>
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="table-base">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Zona</th>
                  <th>Vehículo</th>
                  <th>Duración</th>
                  <th>Monto</th>
                  <th>Método</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_HISTORY.map((h) => (
                  <tr key={h.id}>
                    <td>
                      <p style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{h.date}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{h.startTime} – {h.endTime}</p>
                    </td>
                    <td>
                      <p style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{h.zone}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{h.code}</p>
                    </td>
                    <td><span className="plate" style={{ fontSize: '0.875rem' }}>{h.vehicle}</span></td>
                    <td>{formatDuration(h.duration)}</td>
                    <td style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{formatCOP(h.amount)}</td>
                    <td>{METHOD_ICONS[h.method] || ''} {h.method}</td>
                    <td><span className="badge badge-green">Pagado</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  </MainLayout>
);

export default History;
