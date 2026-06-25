import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatCard from '../../components/ui/StatCard';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Dashboard = () => {
  const { user }              = useAuth();
  const [stats,   setStats]   = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const parkingsRes = await api.getParkings();
        const parkings    = parkingsRes.data;

        if (!parkings.length) { setLoading(false); return; }

        const pid = parkings[0].id;

        const [statsRes, ticketsRes] = await Promise.all([
          api.getParkingStats(pid),
          api.getTicketsByParking(pid, 'status=ACTIVE'),
        ]);

        setStats(statsRes.data);
        setTickets(ticketsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Buen día, {user?.firstName} 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Resumen del día — {new Date().toLocaleDateString('es-CO', {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            })}
          </p>
        </div>

        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Vehículos activos"
              value={stats.activeTickets}
              subtitle={`${stats.availableSpaces} espacios libres`}
              icon="🚗"
              color="emerald"
            />
            <StatCard
              title="Tickets hoy"
              value={stats.todayTickets}
              icon="🎟"
              color="blue"
            />
            <StatCard
              title="Recaudo hoy"
              value={`$${stats.todayRevenue.toLocaleString('es-CO')}`}
              icon="💰"
              color="yellow"
            />
            <StatCard
              title="Ocupación"
              value={`${stats.occupancyRate}%`}
              subtitle={`${stats.totalSpaces} espacios totales`}
              icon="📊"
              color={stats.occupancyRate > 80 ? 'red' : 'emerald'}
            />
          </div>
        )}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-700">
            <h2 className="text-white font-semibold">Vehículos en parqueadero</h2>
            <p className="text-slate-400 text-xs mt-0.5">{tickets.length} activos ahora</p>
          </div>

          {tickets.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">
              No hay vehículos actualmente en el parqueadero
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-900/50">
                  <tr className="text-slate-400 text-left">
                    <th className="px-6 py-3 font-medium">Placa</th>
                    <th className="px-6 py-3 font-medium">Ticket</th>
                    <th className="px-6 py-3 font-medium">Entrada</th>
                    <th className="px-6 py-3 font-medium">Tiempo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {tickets.map((t) => {
                    const mins = Math.floor(
                      (Date.now() - new Date(t.entryTime)) / 60000
                    );
                    return (
                      <tr key={t.id} className="text-slate-300 hover:bg-slate-700/50">
                        <td className="px-6 py-4 font-mono font-bold text-white">
                          {t.vehicle.licensePlate}
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs">
                          {t.ticketNumber}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(t.entryTime).toLocaleTimeString('es-CO', {
                            hour: '2-digit', minute: '2-digit',
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                            mins > 120
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-emerald-500/10 text-emerald-400'
                          }`}>
                            {mins < 60
                              ? `${mins} min`
                              : `${Math.floor(mins/60)}h ${mins%60}min`}
                          </span>
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

export default Dashboard;
