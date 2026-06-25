import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';
import { useActiveParking } from '../../hooks/useActiveParking';
import { api } from '../../services/api';

const STATUS_LABELS = {
  ACTIVE:    { label: 'Activo',    color: 'bg-emerald-500/10 text-emerald-400' },
  PAID:      { label: 'Pagado',    color: 'bg-blue-500/10 text-blue-400' },
  CANCELLED: { label: 'Cancelado', color: 'bg-red-500/10 text-red-400' },
  EXPIRED:   { label: 'Expirado',  color: 'bg-yellow-500/10 text-yellow-400' },
};

const DashboardTickets = () => {
  const { parkingId, loading: loadingParking } = useActiveParking();
  const [tickets, setTickets] = useState([]);
  const [filter,  setFilter]  = useState('ACTIVE');
  const [loading, setLoading] = useState(true);
  const [closing, setClosing] = useState(null);

  const loadTickets = async () => {
    if (!parkingId) return;
    setLoading(true);
    try {
      const query = filter === 'ALL' ? '' : `status=${filter}`;
      const res = await api.getTicketsByParking(parkingId, query);
      setTickets(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTickets(); }, [parkingId, filter]);

  const handleClose = async (ticketId) => {
    setClosing(ticketId);
    try {
      await api.closeTicket(ticketId);
      await loadTickets();
    } catch (err) {
      alert(err.message || 'No se pudo cerrar el ticket');
    } finally {
      setClosing(null);
    }
  };

  if (loadingParking) return <LoadingSpinner />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Tickets</h1>
            <p className="text-slate-400 text-sm mt-1">
              Gestiona los vehículos que entran y salen del parqueadero
            </p>
          </div>

          <div className="flex gap-2">
            {['ACTIVE', 'PAID', 'ALL'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filter === s
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                }`}
              >
                {s === 'ACTIVE' ? 'Activos' : s === 'PAID' ? 'Pagados' : 'Todos'}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          {loading ? (
            <div className="px-6 py-12 text-center text-slate-500">Cargando tickets...</div>
          ) : tickets.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">No hay tickets en este filtro</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-900/50">
                  <tr className="text-slate-400 text-left">
                    <th className="px-6 py-3 font-medium">Ticket</th>
                    <th className="px-6 py-3 font-medium">Placa</th>
                    <th className="px-6 py-3 font-medium">Entrada</th>
                    <th className="px-6 py-3 font-medium">Salida</th>
                    <th className="px-6 py-3 font-medium">Monto</th>
                    <th className="px-6 py-3 font-medium">Estado</th>
                    <th className="px-6 py-3 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {tickets.map((t) => {
                    const statusInfo = STATUS_LABELS[t.status] || STATUS_LABELS.ACTIVE;
                    return (
                      <tr key={t.id} className="text-slate-300 hover:bg-slate-700/50">
                        <td className="px-6 py-4 text-xs text-slate-400">{t.ticketNumber}</td>
                        <td className="px-6 py-4 font-mono font-bold text-white">
                          {t.vehicle.licensePlate}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(t.entryTime).toLocaleString('es-CO', {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                          })}
                        </td>
                        <td className="px-6 py-4">
                          {t.exitTime
                            ? new Date(t.exitTime).toLocaleString('es-CO', {
                                day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                              })
                            : '—'}
                        </td>
                        <td className="px-6 py-4">
                          {t.finalAmount
                            ? `$${Number(t.finalAmount).toLocaleString('es-CO')}`
                            : '—'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {t.status === 'ACTIVE' && (
                            <Button
                              size="sm"
                              variant="secondary"
                              loading={closing === t.id}
                              onClick={() => handleClose(t.id)}
                            >
                              Cerrar
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardTickets;
