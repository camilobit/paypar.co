import { useState, useEffect } from 'react';
import { api } from '../services/api';

/**
 * Resuelve el parqueadero "activo" para el operador/admin logueado.
 * MVP: toma el primer parqueadero de la lista. Cuando existan múltiples
 * parqueaderos por operador, este hook es el único lugar que hay que tocar
 * para agregar un selector — evita duplicar esta lógica en cada página.
 */
export const useActiveParking = () => {
  const [parkingId, setParkingId] = useState(null);
  const [parkings,  setParkings]  = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.getParkings();
        setParkings(res.data);
        if (res.data.length > 0) setParkingId(res.data[0].id);
      } catch (err) {
        setError(err.message || 'No se pudieron cargar los parqueaderos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return { parkingId, parkings, loading, error };
};
