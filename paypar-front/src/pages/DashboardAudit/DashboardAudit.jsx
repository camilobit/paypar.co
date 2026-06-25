import DashboardLayout from '../../layouts/DashboardLayout';

const LOGS = [
  { id: 1, action: 'CREATE_TICKET',   entity: 'ticket',  user: 'Juan García',  email: 'juan@paypar.co',   time: '10:45', date: '22/06/2026' },
  { id: 2, action: 'CLOSE_TICKET',    entity: 'ticket',  user: 'Juan García',  email: 'juan@paypar.co',   time: '11:30', date: '22/06/2026' },
  { id: 3, action: 'CREATE_PAYMENT',  entity: 'payment', user: 'Sistema',      email: 'webhook@wompi.co', time: '11:31', date: '22/06/2026' },
  { id: 4, action: 'CREATE_OPERATOR', entity: 'user',    user: 'Admin PAYPAR', email: 'admin@paypar.co',  time: '09:15', date: '22/06/2026' },
];
const ICONS = { CREATE_TICKET: '🎟', CLOSE_TICKET: '✅', CREATE_PAYMENT: '💳', CREATE_OPERATOR: '👤', TOGGLE_USER: '🔄' };

const DashboardAudit = () => (
  <DashboardLayout>
    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Auditoría</h1>
    <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)', marginBottom: '1.5rem' }}>Registro de acciones críticas del sistema</p>
    <div className="card" style={{ overflow: 'hidden' }}>
      {LOGS.map((log) => (
        <div key={log.id} style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--gray-100)' }}>
          <span style={{ fontSize: '1.25rem' }}>{ICONS[log.action] || '📋'}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--gray-900)' }}>{log.action}</span>
              <span className="badge badge-gray">{log.entity}</span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginTop: 2 }}>
              {log.user} ({log.email}) · {log.date} {log.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </DashboardLayout>
);
export default DashboardAudit;
