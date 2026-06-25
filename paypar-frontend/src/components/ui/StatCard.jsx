const colors = {
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  blue:    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  yellow:  'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  red:     'bg-red-500/10 text-red-400 border-red-500/20',
};

const StatCard = ({ title, value, subtitle, icon, color = 'emerald' }) => (
  <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
    <div className="flex items-start justify-between mb-4">
      <p className="text-slate-400 text-sm">{title}</p>
      {icon && <span className={`text-2xl p-2 rounded-xl border ${colors[color]}`}>{icon}</span>}
    </div>
    <p className="text-3xl font-bold text-white mb-1">{value}</p>
    {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
  </div>
);
export default StatCard;
