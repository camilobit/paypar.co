const ZoneBadge = ({ available, total }) => {
  const pct = ((total - available) / total) * 100;
  const color = available === 0 ? 'red' : pct > 70 ? 'amber' : 'green';
  const labels = { red: 'Lleno', amber: 'Casi lleno', green: 'Disponible' };
  return (
    <span className={`badge badge-${color}`}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
      {available > 0 ? `${available} espacios` : labels[color]}
    </span>
  );
};

export default ZoneBadge;
