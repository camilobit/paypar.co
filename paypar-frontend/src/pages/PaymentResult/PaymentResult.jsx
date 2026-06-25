import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { api } from '../../services/api';

const STATUS_CONFIG = {
  COMPLETED: { icon: '✅', title: '¡Pago exitoso!', desc: 'Tu ticket ha sido pagado correctamente. Ya puedes retirar tu vehículo.' },
  PENDING:   { icon: '⏳', title: 'Pago en proceso', desc: 'Estamos confirmando tu pago con la pasarela. Esto puede tardar unos segundos.' },
  FAILED:    { icon: '❌', title: 'Pago rechazado', desc: 'Tu pago no pudo procesarse. Intenta nuevamente o usa otro método.' },
  REFUNDED:  { icon: '↩️', title: 'Pago reembolsado', desc: 'Este pago fue reembolsado.' },
};

const PaymentResult = () => {
  const [params]  = useSearchParams();
  const paymentId = params.get('paymentId');
  const [status,  setStatus]  = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!paymentId) { setLoading(false); return; }

    const checkStatus = async () => {
      try {
        const res = await api.syncPaymentStatus(paymentId);
        setStatus(res.data?.status || 'PENDING');
      } catch {
        // Si la sincronización falla (ej. usuario no autenticado), mostramos estado pendiente
        // en lugar de un error técnico — el webhook eventualmente confirmará el pago.
        setStatus('PENDING');
      } finally {
        setLoading(false);
      }
    };

    checkStatus();
  }, [paymentId]);

  if (loading) return <LoadingSpinner message="Confirmando tu pago..." />;

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center bg-slate-800 rounded-2xl p-10 border border-slate-700">
          <div className="text-6xl mb-4">{config.icon}</div>
          <h1 className="text-2xl font-bold text-white mb-2">{config.title}</h1>
          <p className="text-slate-400 text-sm mb-6">{config.desc}</p>
          {paymentId && (
            <p className="text-xs text-slate-600 font-mono mb-6">Ref: {paymentId}</p>
          )}
          <Link
            to="/"
            className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default PaymentResult;
