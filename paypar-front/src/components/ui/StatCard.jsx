const COLORS = {
  blue:   { bg: 'var(--blue-50)',   icon: 'var(--blue-600)',  text: 'var(--blue-600)' },
  green:  { bg: 'var(--green-50)',  icon: 'var(--green-600)', text: 'var(--green-600)' },
  amber:  { bg: 'var(--amber-50)',  icon: 'var(--amber-500)', text: 'var(--amber-500)' },
  red:    { bg: 'var(--red-50)',    icon: 'var(--red-500)',   text: 'var(--red-500)' },
  gray:   { bg: 'var(--gray-100)', icon: 'var(--gray-600)',  text: 'var(--gray-600)' },
};

const StatCard = ({ title, value, subtitle, icon, color = 'blue', trend }) => {
  const c = COLORS[color] || COLORS.blue;
  return (
    <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </p>
        {icon && (
          <div style={{ width: 36, height: 36, borderRadius: 8, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: c.icon }}>
            {icon}
          </div>
        )}
      </div>
      <p className="stat-value" style={{ color: 'var(--gray-900)', marginBottom: '0.25rem' }}>{value}</p>
      {subtitle && <p style={{ fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{subtitle}</p>}
      {trend && (
        <p style={{ fontSize: '0.8125rem', color: trend.up ? 'var(--green-600)' : 'var(--red-500)', marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: 4 }}>
          {trend.up ? '↑' : '↓'} {trend.label}
        </p>
      )}
    </div>
  );
};

export default StatCard;
