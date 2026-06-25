const Input = ({ label, error, id, className = '', ...props }) => (
  <div className="flex flex-col gap-1">
    {label && <label htmlFor={id} className="text-sm font-medium text-slate-300">{label}</label>}
    <input
      id={id}
      className={`bg-slate-800 border rounded-xl px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all ${error ? 'border-red-500 focus:border-red-400' : 'border-slate-700 focus:border-emerald-500'} ${className}`}
      {...props}
    />
    {error && <p className="text-xs text-red-400">{error}</p>}
  </div>
);
export default Input;
