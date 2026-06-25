import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { api } from '../../services/api';

const ACTION_ICONS = {
  CREATE_TICKET:   '🎟',
  CLOSE_TICKET:    '✅',
  CREATE_PAYMENT:  '💳',
  CREATE_USER:     '👤',
  TOGGLE_USER:     '🔄',
};

const DashboardAudit = () => {
  const [logs,    setLogs]    = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getAuditLogs('limit=100');
        setLogs(res.data || []);
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
          <h1 className="text-2xl font-bold text-white">Auditoría</h1>
          <p className="text-slate-400 text-sm mt-1">
            Registro de acciones críticas del sistema
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          {logs.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-500">
              Aún no hay eventos registrados
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {logs.map((log) => (
                <div key={log.id} className="px-6 py-4 flex items-start gap-4 hover:bg-slate-700/30">
                  <span className="text-xl">{ACTION_ICONS[log.action] || '📋'}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium text-sm">{log.action}</span>
                      <span className="text-slate-500 text-xs">·</span>
                      <span className="text-slate-400 text-xs">{log.entityType}</span>
                    </div>
                    <p className="text-slate-500 text-xs mt-1">
                      {log.user ? `${log.user.firstName} (${log.user.email})` : 'Sistema'}
                      {' — '}
                      {new Date(log.createdAt).toLocaleString('es-CO', {
                        day: '2-digit', month: '2-digit', year: 'numeric',
                        hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardAudit;
