const variants = {
  primary:   'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg',
  secondary: 'border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white',
  danger:    'bg-red-500 hover:bg-red-600 text-white',
  ghost:     'text-slate-400 hover:text-white hover:bg-slate-800',
};
const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5', lg: 'px-8 py-4 text-lg' };

const Button = ({ children, variant = 'primary', size = 'md', loading = false, disabled = false, className = '', ...props }) => (
  <button
    disabled={disabled || loading}
    className={`font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
    {...props}
  >
    {loading ? (
      <span className="flex items-center justify-center gap-2">
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        Cargando...
      </span>
    ) : children}
  </button>
);
export default Button;
