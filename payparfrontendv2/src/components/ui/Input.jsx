const Input = ({ label, error, hint, id, className = '', ...props }) => (
  <div className="form-group">
    {label && (
      <label htmlFor={id} className="form-label">{label}</label>
    )}
    <input
      id={id}
      className={`input-base ${error ? 'input-error' : ''} ${className}`}
      {...props}
    />
    {hint && !error && <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{hint}</p>}
    {error && <p style={{ fontSize: '0.8rem', color: 'var(--red-500)' }}>{error}</p>}
  </div>
);

export default Input;
