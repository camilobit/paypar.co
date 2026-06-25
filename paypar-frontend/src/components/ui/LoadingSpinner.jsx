const LoadingSpinner = ({ message = 'Cargando...' }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
    <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
    <p className="text-slate-400 text-sm">{message}</p>
  </div>
);
export default LoadingSpinner;
