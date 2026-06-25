import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { api } from '../../services/api';

const DashboardZones = () => {
  const [zones,   setZones]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getZones();
        setZones(res.data);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar las zonas azules');
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
          <h1 className="text-2xl font-bold text-white">Zonas Azules</h1>
          <p className="text-slate-400 text-sm mt-1">
            Zonas de estacionamiento urbano regulado
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {zones.length === 0 ? (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 px-6 py-12 text-center text-slate-500">
            Aún no hay zonas azules registradas. Créalas desde Swagger (
            <code className="text-emerald-400">POST /zones</code>) mientras se construye
            el formulario de creación en el panel.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {zones.map((z) => (
              <div key={z.id} className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">🔵</span>
                  <span className="px-2 py-1 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400">
                    {z.zoneCode}
                  </span>
                </div>
                <h3 className="text-white font-semibold mb-1">{z.parking?.name}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  {z.parking?.city?.name}, {z.parking?.city?.department}
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tiempo máximo</span>
                    <span className="text-white">{z.maxDurationMinutes} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Horario</span>
                    <span className="text-white">{z.enforcementStart} – {z.enforcementEnd}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DashboardZones;
