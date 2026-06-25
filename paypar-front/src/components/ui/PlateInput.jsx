import { useState } from 'react';
import Button from './Button';

const PlateInput = ({ onSearch, loading, placeholder = 'Ej: ABC 123', size = 'lg' }) => {
  const [plate, setPlate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const clean = plate.replace(/\s/g, '').toUpperCase();
    if (clean.length >= 5) onSearch(clean);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <input
            type="text"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            placeholder={placeholder}
            maxLength={8}
            autoComplete="off"
            style={{
              width: '100%',
              background: 'var(--white)',
              border: '2px solid var(--gray-200)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              fontSize: '1.25rem',
              fontFamily: "'Courier New', monospace",
              fontWeight: 700,
              letterSpacing: '0.15em',
              textAlign: 'center',
              color: 'var(--gray-900)',
              outline: 'none',
              textTransform: 'uppercase',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--blue-600)';
              e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--gray-200)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          size={size}
          loading={loading}
          disabled={plate.replace(/\s/g, '').length < 5}
        >
          Buscar
        </Button>
      </div>
    </form>
  );
};

export default PlateInput;
