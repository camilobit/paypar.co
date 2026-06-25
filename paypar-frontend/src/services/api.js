const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api/v1';

const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('paypar_token');
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
};

export const api = {
  register:    (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login:       (body) => request('/auth/login',    { method: 'POST', body: JSON.stringify(body) }),
  googleAuth:  (body) => request('/auth/google',   { method: 'POST', body: JSON.stringify(body) }),
  getProfile:  ()     => request('/auth/me'),

  getMyVehicles:     ()    => request('/vehicles'),
  getVehicleByPlate: (p)   => request(`/vehicles/plate/${p}`),
  createVehicle:     (b)   => request('/vehicles', { method: 'POST', body: JSON.stringify(b) }),
  deleteVehicle:     (id)  => request(`/vehicles/${id}`, { method: 'DELETE' }),

  getTicketByPlate:    (p)       => request(`/tickets/plate/${p}`),
  createTicket:        (b)       => request('/tickets', { method: 'POST', body: JSON.stringify(b) }),
  closeTicket:         (id)      => request(`/tickets/${id}/close`, { method: 'PATCH' }),
  getTicketsByParking: (id, q='')=> request(`/tickets/parking/${id}?${q}`),

  createPayment:        (b)       => request('/payments', { method: 'POST', body: JSON.stringify(b) }),
  getPaymentsByParking: (id, q='')=> request(`/payments/parking/${id}?${q}`),

  getParkings:      (q='') => request(`/parkings?${q}`),
  getParkingById:   (id)   => request(`/parkings/${id}`),
  getParkingStats:  (id)   => request(`/parkings/${id}/stats`),

  syncPaymentStatus: (id) => request(`/payments/${id}/sync`),

  getZones: () => request('/zones'),

  // Users (ADMIN)
  getUsers:         ()    => request('/users'),
  createOperator:   (b)   => request('/users/operators', { method: 'POST', body: JSON.stringify(b) }),
  toggleUserActive: (id)  => request(`/users/${id}/toggle`, { method: 'PATCH' }),

  // Audit (ADMIN)
  getAuditLogs: (q = '') => request(`/audit?${q}`),
};
