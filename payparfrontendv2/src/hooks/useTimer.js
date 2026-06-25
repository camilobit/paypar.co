import { useState, useEffect, useRef } from 'react';

/**
 * Hook que actualiza cada segundo la duración en minutos desde startTime.
 * Se usa en la pantalla de sesión activa para mostrar el cronómetro.
 */
export const useTimer = (startTime) => {
  const calcMinutes = () =>
    Math.floor((Date.now() - new Date(startTime).getTime()) / 60000);

  const [minutes, setMinutes] = useState(calcMinutes);
  const [seconds, setSeconds] = useState(
    Math.floor((Date.now() - new Date(startTime).getTime()) / 1000) % 60
  );
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - new Date(startTime).getTime()) / 1000);
      setMinutes(Math.floor(elapsed / 60));
      setSeconds(elapsed % 60);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [startTime]);

  const display = `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  return { minutes, seconds, display };
};
