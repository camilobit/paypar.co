import { formatCOP } from '../../data/mock';

const BarChart = ({ data = [], height = 160, color = 'var(--blue-600)' }) => {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height, paddingBottom: 0 }}>
        {data.map((d, i) => {
          const barHeight = Math.max((d.value / max) * height, 4);
          return (
            <div
              key={i}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}
            >
              <div
                title={formatCOP(d.value)}
                style={{
                  width: '100%',
                  height: barHeight,
                  background: color,
                  borderRadius: '4px 4px 0 0',
                  opacity: i === data.length - 1 ? 1 : 0.65,
                  transition: 'height 0.4s ease',
                  cursor: 'default',
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: 'center', fontSize: '0.7rem', color: 'var(--gray-400)', fontWeight: 500 }}>
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;
