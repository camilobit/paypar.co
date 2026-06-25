// ── Mock data para demostración sin backend ──────────────────────────
// Cuando el backend esté conectado, estos datos son reemplazados por
// las llamadas reales en services/api.js

export const MOCK_USER = {
  id: 'usr-001',
  firstName: 'Carlos',
  lastName: 'Mendoza',
  email: 'carlos@ejemplo.com',
  phone: '3001234567',
  role: 'CLIENT',
  avatarUrl: null,
};

export const MOCK_VEHICLES = [
  { id: 'veh-001', licensePlate: 'ABC123', brand: 'Chevrolet', model: 'Spark', color: 'Rojo', type: 'CAR', year: '2021' },
  { id: 'veh-002', licensePlate: 'XYZ789', brand: 'Yamaha',    model: 'MT-03', color: 'Negro', type: 'MOTORCYCLE', year: '2022' },
];

export const MOCK_ZONES = [
  { id: 'z-001', code: 'ZA-01', name: 'Centro Histórico',   address: 'Carrera 5 con Calle 34',    available: 12, total: 30, rate: 2500, lat: 4.1420, lng: -73.6266, color: 'green' },
  { id: 'z-002', code: 'ZA-02', name: 'Zona Rosa',          address: 'Calle 42 con Avenida 40',   available: 3,  total: 20, rate: 3000, lat: 4.1390, lng: -73.6290, color: 'amber' },
  { id: 'z-003', code: 'ZA-03', name: 'Terminal de Transportes', address: 'Avenida del Llano',    available: 0,  total: 15, rate: 2000, lat: 4.1450, lng: -73.6230, color: 'red' },
  { id: 'z-004', code: 'ZA-04', name: 'Barrio Bello Horizonte', address: 'Calle 19 con Carrera 28', available: 8, total: 25, rate: 2000, lat: 4.1360, lng: -73.6310, color: 'green' },
  { id: 'z-005', code: 'ZA-05', name: 'Avenida Circunvalar', address: 'Avenida Circunvalar km 2', available: 18, total: 40, rate: 1500, lat: 4.1480, lng: -73.6200, color: 'green' },
];

export const MOCK_ACTIVE_SESSION = {
  id: 'sess-001',
  vehicleId: 'veh-001',
  vehicle: { licensePlate: 'ABC123', brand: 'Chevrolet', model: 'Spark' },
  zone: { id: 'z-001', name: 'Centro Histórico', code: 'ZA-01', rate: 2500 },
  startTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 min ago
  status: 'ACTIVE',
};

export const MOCK_HISTORY = [
  {
    id: 'h-001',
    zone: 'Centro Histórico', code: 'ZA-01',
    vehicle: 'ABC123',
    date: '2026-06-10', startTime: '09:15', endTime: '11:30',
    duration: 135, amount: 5625, method: 'CARD', status: 'PAID',
  },
  {
    id: 'h-002',
    zone: 'Zona Rosa', code: 'ZA-02',
    vehicle: 'ABC123',
    date: '2026-06-08', startTime: '14:00', endTime: '15:20',
    duration: 80, amount: 4000, method: 'NEQUI', status: 'PAID',
  },
  {
    id: 'h-003',
    zone: 'Bello Horizonte', code: 'ZA-04',
    vehicle: 'XYZ789',
    date: '2026-06-06', startTime: '08:30', endTime: '09:00',
    duration: 30, amount: 1000, method: 'CASH', status: 'PAID',
  },
  {
    id: 'h-004',
    zone: 'Terminal de Transportes', code: 'ZA-03',
    vehicle: 'ABC123',
    date: '2026-06-03', startTime: '17:45', endTime: '19:15',
    duration: 90, amount: 3000, method: 'CARD', status: 'PAID',
  },
];

export const MOCK_DASHBOARD_STATS = {
  recaudoHoy:    1_845_000,
  recaudoMes:    38_920_000,
  vehiculosActivos: 47,
  operadoresActivos: 8,
  ticketsHoy:    124,
  ocupacionPromedio: 73,
  zonaMasActiva: 'Centro Histórico',
};

export const MOCK_CHART_DATA = [
  { label: 'Lun', value: 1_200_000 },
  { label: 'Mar', value: 1_540_000 },
  { label: 'Mié', value: 980_000 },
  { label: 'Jue', value: 1_780_000 },
  { label: 'Vie', value: 2_100_000 },
  { label: 'Sáb', value: 2_450_000 },
  { label: 'Dom', value: 1_845_000 },
];

export const MOCK_ACTIVE_TICKETS = [
  { id: 't-001', plate: 'ABC123', zone: 'Centro Histórico', entryTime: new Date(Date.now() - 25*60000).toISOString(), operator: 'Juan García' },
  { id: 't-002', plate: 'MNO456', zone: 'Zona Rosa',         entryTime: new Date(Date.now() - 92*60000).toISOString(), operator: 'María López' },
  { id: 't-003', plate: 'PQR789', zone: 'Bello Horizonte',   entryTime: new Date(Date.now() - 12*60000).toISOString(), operator: 'Juan García' },
  { id: 't-004', plate: 'STU012', zone: 'Avenida Circunvalar', entryTime: new Date(Date.now() - 155*60000).toISOString(), operator: 'Ana Martínez' },
  { id: 't-005', plate: 'VWX345', zone: 'Centro Histórico',  entryTime: new Date(Date.now() - 40*60000).toISOString(), operator: 'Juan García' },
];

export const VEHICLE_TYPES = [
  { value: 'CAR',        label: 'Automóvil',          icon: '🚗' },
  { value: 'MOTORCYCLE', label: 'Motocicleta',         icon: '🏍' },
  { value: 'TRUCK',      label: 'Camioneta / Pickup',  icon: '🚙' },
  { value: 'VAN',        label: 'Van / Furgón',        icon: '🚐' },
];

export const PAYMENT_METHODS = [
  { value: 'CARD',      label: 'Tarjeta débito / crédito', icon: '💳' },
  { value: 'NEQUI',     label: 'Nequi',                    icon: '📱' },
  { value: 'DAVIPLATA', label: 'Daviplata',                 icon: '📱' },
  { value: 'CASH',      label: 'Efectivo en caja',          icon: '💵' },
];

export const VEHICLE_BRANDS = [
  'Chevrolet', 'Renault', 'Kia', 'Mazda', 'Toyota', 'Hyundai',
  'Nissan', 'Ford', 'Volkswagen', 'Honda', 'Yamaha', 'Suzuki',
  'AKT', 'TVS', 'Bajaj', 'Otro',
];

// Calcula tarifa según minutos y rate por hora
export const calcAmount = (minutes, hourlyRate) =>
  Math.ceil((minutes / 60) * hourlyRate);

// Formatea pesos colombianos
export const formatCOP = (n) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

// Formatea minutos a "1h 25min"
export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
};
