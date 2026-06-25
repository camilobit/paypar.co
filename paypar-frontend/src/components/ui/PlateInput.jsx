import { useState } from 'react';
import Button from './Button';

const PlateInput = ({ onSearch, loading }) => {
  const [plate, setPlate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (plate.trim().length >= 5) onSearch(plate.trim().toUpperCase());
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={plate}
        onChange={(e) => setPlate(e.target.value.toUpperCase())}
        placeholder="Ej: ABC123"
        maxLength={7}
        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 text-center font-mono font-bold text-lg uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />
      <Button type="submit" loading={loading} disabled={plate.length < 5} size="lg">
        Buscar
      </Button>
    </form>
  );
};
export default PlateInput;
