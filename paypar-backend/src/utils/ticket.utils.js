export const calculateDurationMinutes = (entryTime, exitTime = new Date()) => {
  const diff = new Date(exitTime) - new Date(entryTime);
  return Math.ceil(diff / (1000 * 60));
};

export const calculateAmount = (durationMinutes, hourlyRate) => {
  const hours = durationMinutes / 60;
  const amount = hours * hourlyRate;
  return Math.ceil(amount);
};

export const generateTicketNumber = () => {
  const date   = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
  return `TKT-${date}-${random}`;
};
