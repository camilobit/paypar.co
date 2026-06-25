import { useEffect, useRef } from 'react';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Botón de "Continuar con Google" usando Google Identity Services (GIS).
 * El script de GIS se carga globalmente en index.html.
 *
 * onSuccess recibe el idToken crudo — el componente padre decide
 * qué hacer con él (normalmente: enviarlo a POST /auth/google).
 */
const GoogleSignInButton = ({ onSuccess, onError, disabled = false }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || !window.google?.accounts?.id) return;

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: (credentialResponse) => {
        if (credentialResponse?.credential) {
          onSuccess(credentialResponse.credential);
        } else {
          onError?.('No se pudo obtener la credencial de Google');
        }
      },
    });

    if (buttonRef.current) {
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        text: 'continue_with',
        locale: 'es',
      });
    }
  }, [onSuccess, onError]);

  if (!GOOGLE_CLIENT_ID) {
    return (
      <p className="text-xs text-slate-600 text-center">
        Login con Google no configurado (falta VITE_GOOGLE_CLIENT_ID)
      </p>
    );
  }

  return (
    <div
      ref={buttonRef}
      className={`flex justify-center ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
    />
  );
};

export default GoogleSignInButton;
