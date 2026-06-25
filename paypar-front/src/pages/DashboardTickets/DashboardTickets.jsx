import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import PlateInput from '../../components/ui/PlateInput';
import { MOCK_ACTIVE_TICKETS, formatDuration } from '../../data/mock';

const DashboardTickets = () => {
  const [filter, setFilter] = useState('active');
  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Tickets</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)' }}>Gestiona los vehículos que entran y salen</p>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[['active','Activos'],['paid','Pagados'],['all','Todos']].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} className={`btn btn-sm ${filter === v ? 'btn-primary' : 'btn-ghost'}`}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 400, marginBottom: '1.5rem' }}>
        <PlateInput onSearch={(p) => alert(`Buscar: ${p}`)} loading={false} placeholder="Buscar por placa" size="md" />
      </div>
      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="table-base">
          <thead><tr><th>Placa</th><th>Zona</th><th>Entrada</th><th>Tiempo</th><th>Operador</th><th></th></tr></thead>
          <tbody>
            {MOCK_ACTIVE_TICKETS.map((t) => {
              const mins = Math.floor((Date.now() - new Date(t.entryTime)) / 60000);
              return (
                <tr key={t.id}>
                  <td><span className="plate" style={{ fontSize: '0.9rem' }}>{t.plate}</span></td>
                  <td style={{ color: 'var(--gray-700)' }}>{t.zone}</td>
                  <td style={{ color: 'var(--gray-500)' }}>{new Date(t.entryTime).toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'})}</td>
                  <td><span className={`badge ${mins>120?'badge-red':'badge-green'}`}>{formatDuration(mins)}</span></td>
                  <td style={{ color: 'var(--gray-500)' }}>{t.operator}</td>
                  <td><Button size="sm" variant="secondary">Cerrar</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};
export default DashboardTickets;
