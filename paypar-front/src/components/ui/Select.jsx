const Select = ({ label, error, id, options = [], placeholder, className = '', ...props }) => (
  <div className="form-group">
    {label && <label htmlFor={id} className="form-label">{label}</label>}
    <select
      id={id}
      className={`input-base ${error ? 'input-error' : ''} ${className}`}
      style={{ cursor: 'pointer' }}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    {error && <p style={{ fontSize: '0.8rem', color: 'var(--red-500)' }}>{error}</p>}
  </div>
);

export default Select;
