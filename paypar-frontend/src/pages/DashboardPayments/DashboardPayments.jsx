import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import StatCard from '../../components/ui/StatCard';
import { useActiveParking } from '../../hooks/useActiveParking';
import { api } from '../../services/api';

const METHOD_LABELS = {
  CARD: '💳 Tarjeta',
  CASH: '💵 Efectivo',
  TRANSFER: '🏦 Transferencia',
  NEQUI: '📱 Nequi',
  DAVIPLATA: '📱 Daviplata',
};

const DashboardPayments = () => {
  const { parkingId, loading: loadingParking } = useActiveParking();
  const [data,    setData]    = useState({ payments: [], total: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!parkingId) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.getPaymentsByParking(parkingId);
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [parkingId]);

  if (loadingParking) return <LoadingSpinner />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Pagos</h1>
          <p className="text-slate-400 text-sm mt-1">Historial de pagos completados</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total recaudado"
            value={`$${data.total.toLocaleString('es-CO')}`}
            icon="💰"
            color="emerald"
          />
          <StatCard
            title="Pagos completados"
            value={data.count}
            icon="✅"
            color="blue"
          />
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          {loading ? (
            <div className="px-6 py-12 text-center text-slate-500">Cargando pagos...</div>
          ) : data.payments.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">Aún no hay pagos registrados</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-900/50">
                  <tr className="text-slate-400 text-left">
                    <th className="px-6 py-3 font-medium">Placa</th>
                    <th className="px-6 py-3 font-medium">Método</th>
                    <th className="px-6 py-3 font-medium">Monto</th>
                    <th className="px-6 py-3 font-medium">Cliente</th>
                    <th className="px-6 py-3 font-medium">Fecha</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {data.payments.map((p) => (
                    <tr key={p.id} className="text-slate-300 hover:bg-slate-700/50">
                      <td className="px-6 py-4 font-mono font-bold text-white">
                        {p.ticket?.vehicle?.licensePlate}
                      </td>
                      <td className="px-6 py-4">{METHOD_LABELS[p.method] || p.method}</td>
                      <td className="px-6 py-4 text-emerald-400 font-medium">
                        ${Number(p.amount).toLocaleString('es-CO')}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {p.user?.email || 'Anónimo'}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(p.createdAt).toLocaleString('es-CO', {
                          day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardPayments;
