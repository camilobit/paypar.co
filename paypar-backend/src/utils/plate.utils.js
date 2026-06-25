export const normalizePlate = (plate) =>
  plate.trim().toUpperCase().replace(/\s+/g, '');

export const isValidColombianPlate = (plate) => {
  const normalized = normalizePlate(plate);
  const carPattern  = /^[A-Z]{3}[0-9]{3}$/;
  const motoPattern = /^[A-Z]{3}[0-9]{2}[A-Z]$/;
  return carPattern.test(normalized) || motoPattern.test(normalized);
};
