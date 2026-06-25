const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    success:   'btn-success',
    danger:    'btn-danger',
    ghost:     'btn-ghost',
  };
  const sizes = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
  };

  return (
    <button
      disabled={disabled || loading}
      className={`btn ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner" style={{ width: 16, height: 16 }} />
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {icon && <span className="text-base leading-none">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
