import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import MainLayout from '../../layouts/MainLayout';
import PlateInput from '../../components/ui/PlateInput';
import Button from '../../components/ui/Button';

/**
 * Carga el script del widget de Wompi una sola vez.
 * Wompi ofrece un checkout embebido vía <script> + función global.
 */
const loadWompiWidget = () =>
  new Promise((resolve, reject) => {
    if (window.WidgetCheckout) return resolve();
    const script = document.createElement('script');
    script.src = 'https://checkout.wompi.co/widget.js';
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });

const Parking = () => {
  const [step,    setStep]    = useState('search'); // search | found
  const [ticket,  setTicket]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState('');
  const navigate              = useNavigate();

  useEffect(() => {
    loadWompiWidget().catch(() => {
      console.warn('No se pudo cargar el widget de Wompi (revisa tu conexión)');
    });
  }, []);

  const handleSearch = async (plate) => {
    setError('');
    setLoading(true);
    try {
      const res = await api.getTicketByPlate(plate);
      setTicket(res.data);
      setStep('found');
    } catch (err) {
      setError(err.message || 'No se encontró un ticket activo para esa placa');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Pago en efectivo o transferencia manual: no requiere pasarela,
   * el backend ya lo marca como COMPLETED directamente.
   */
  const handleSimplePay = async (method) => {
    setLoading(true);
    setError('');
    try {
      await api.closeTicket(ticket.id);
      const res = await api.createPayment({ ticketId: ticket.id, method });
      navigate(`/payment-result?paymentId=${res.data.id}`);
    } catch (err) {
      setError(err.message || 'Error procesando el pago');
      setLoading(false);
    }
  };

  /**
   * Pago con tarjeta: cierra el ticket, crea el registro de pago,
   * y abre el widget real de Wompi con los datos de checkout
   * que el backend ya calculó (incluye la firma de integridad).
   */
  const handleCardPay = async () => {
    setLoading(true);
    setError('');
    try {
      await api.closeTicket(ticket.id);
      const res = await api.createPayment({ ticketId: ticket.id, method: 'CARD' });
      const { checkout, id: paymentId } = res.data;

      if (!checkout || !window.WidgetCheckout) {
        setError('No fue posible abrir la pasarela de pago. Intenta con otro método.');
        setLoading(false);
        return;
      }

      const widget = new window.WidgetCheckout({
        currency:        checkout.currency,
        amountInCents:   checkout.amountInCents,
        reference:       checkout.reference,
        publicKey:       checkout.publicKey,
        signature:       { integrity: checkout.signature },
        redirectUrl:     checkout.redirectUrl,
      });

      widget.open((result) => {
        setLoading(false);
        // Wompi ya redirige solo, pero por si el callback se dispara antes:
        if (result?.transaction) {
          navigate(`/payment-result?paymentId=${paymentId}`);
        }
      });
    } catch (err) {
      setError(err.message || 'Error procesando el pago');
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8 border border-slate-700">

          {step === 'search' && (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">Pagar parqueadero</h1>
              <p className="text-slate-400 text-sm mb-6">
                Ingresa la placa de tu vehículo para consultar tu ticket
              </p>
              <PlateInput onSearch={handleSearch} loading={loading} />
              {error && (
                <p className="mt-4 text-red-400 text-sm text-center">{error}</p>
              )}
            </>
          )}

          {step === 'found' && ticket && (
            <>
              <div className="text-center mb-6">
                <span className="text-5xl">🚗</span>
                <h2 className="text-xl font-bold text-white mt-3">
                  {ticket.vehicle?.licensePlate}
                </h2>
                <p className="text-slate-400 text-sm">{ticket.parking?.name}</p>
              </div>

              <div className="bg-slate-900 rounded-xl p-4 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Entrada</span>
                  <span className="text-white">
                    {new Date(ticket.entryTime).toLocaleTimeString('es-CO', {
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Tiempo</span>
                  <span className="text-white">{ticket.durationMinutes} min</span>
                </div>
                <div className="flex justify-between font-bold border-t border-slate-700 pt-3">
                  <span className="text-slate-300">Total a pagar</span>
                  <span className="text-emerald-400 text-lg">
                    ${Number(ticket.baseAmount).toLocaleString('es-CO')} COP
                  </span>
                </div>
              </div>

              {error && (
                <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
              )}

              <div className="space-y-2">
                <Button className="w-full" onClick={handleCardPay} loading={loading}>
                  💳 Pagar con tarjeta (Wompi)
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => handleSimplePay('NEQUI')}
                  disabled={loading}
                >
                  📱 Pagar con Nequi
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => handleSimplePay('CASH')}
                  disabled={loading}
                >
                  💵 Pago en caja (efectivo)
                </Button>
              </div>

              <button
                onClick={() => { setStep('search'); setTicket(null); setError(''); }}
                className="w-full mt-4 text-slate-500 hover:text-slate-300 text-sm transition-colors"
              >
                ← Buscar otra placa
              </button>
            </>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Parking;
