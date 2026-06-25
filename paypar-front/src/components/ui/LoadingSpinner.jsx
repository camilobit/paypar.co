const LoadingSpinner = ({ message = 'Cargando...' }) => (
  <div
    style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--gray-50)',
      gap: '1rem',
    }}
  >
    <svg width="40" height="40" viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--gray-200)" strokeWidth="3" />
      <circle
        cx="20" cy="20" r="16" fill="none"
        stroke="var(--blue-600)" strokeWidth="3"
        strokeDasharray="60 40" strokeLinecap="round"
        style={{ transformOrigin: 'center', animation: 'spin 0.8s linear infinite' }}
      />
    </svg>
    <p style={{ color: 'var(--gray-500)', fontSize: '0.9rem' }}>{message}</p>
  </div>
);

export default LoadingSpinner;
