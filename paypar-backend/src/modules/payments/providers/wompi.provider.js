import crypto from 'crypto';
import { env } from '../../../config/env.js';
import { logger } from '../../../logger/logger.js';

const WOMPI_BASE_URL = env.isProd
  ? 'https://production.wompi.co/v1'
  : 'https://sandbox.wompi.co/v1';

/**
 * Genera la firma de integridad requerida por Wompi para crear una transacción.
 * Formula oficial: SHA256(referencia + monto_en_centavos + moneda + secreto_integridad)
 */
const buildIntegritySignature = (reference, amountInCents, currency = 'COP') => {
  const raw = `${reference}${amountInCents}${currency}${env.wompi.eventsSecret}`;
  return crypto.createHash('sha256').update(raw).digest('hex');
};

/**
 * Verifica que un evento de webhook realmente proviene de Wompi,
 * usando el checksum que ellos envían en cada notificación.
 */
const verifyWebhookSignature = (eventBody) => {
  const { signature, timestamp, data } = eventBody;
  if (!signature?.checksum) return false;

  const properties = signature.properties || [];
  const concatenatedValues = properties
    .map((prop) => {
      const keys = prop.split('.');
      let value = data;
      for (const key of keys) value = value?.[key];
      return value;
    })
    .join('');

  const raw = `${concatenatedValues}${timestamp}${env.wompi.eventsSecret}`;
  const expectedChecksum = crypto.createHash('sha256').update(raw).digest('hex').toUpperCase();

  return expectedChecksum === signature.checksum.toUpperCase();
};

export const wompiProvider = {
  /**
   * Construye los datos necesarios para que el FRONTEND abra el widget de Wompi.
   * El backend nunca maneja datos de tarjeta directamente — solo prepara la firma.
   */
  buildCheckoutData({ reference, amountInCOP, customerEmail }) {
    const amountInCents = Math.round(amountInCOP * 100);
    const signature = buildIntegritySignature(reference, amountInCents, 'COP');

    return {
      publicKey:     env.wompi.publicKey,
      currency:      'COP',
      amountInCents,
      reference,
      signature,
      customerEmail,
      redirectUrl:   `${env.frontendUrl}/payment-result`,
    };
  },

  /**
   * Consulta el estado real de una transacción directamente en la API de Wompi.
   * Se usa como respaldo si el webhook no llega o llega tarde.
   */
  async fetchTransactionStatus(transactionId) {
    const res = await fetch(`${WOMPI_BASE_URL}/transactions/${transactionId}`);
    if (!res.ok) {
      logger.error('Error consultando transacción en Wompi', { transactionId, status: res.status });
      throw new Error('No fue posible consultar el estado del pago en Wompi');
    }
    const { data } = await res.json();
    return data; // { id, status: 'APPROVED' | 'DECLINED' | 'PENDING' | 'ERROR', reference, amount_in_cents, ... }
  },

  /**
   * Mapea los estados de Wompi a los estados internos de PAYPAR.
   */
  mapWompiStatus(wompiStatus) {
    const map = {
      APPROVED: 'COMPLETED',
      DECLINED: 'FAILED',
      ERROR:    'FAILED',
      VOIDED:   'REFUNDED',
      PENDING:  'PENDING',
    };
    return map[wompiStatus] || 'PENDING';
  },

  verifyWebhookSignature,
};
