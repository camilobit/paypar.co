import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/dashboard',          label: 'Dashboard',    icon: '📊', roles: ['OPERATOR','ADMIN'] },
  { to: '/dashboard/tickets',  label: 'Tickets',      icon: '🎟', roles: ['OPERATOR','ADMIN'] },
  { to: '/dashboard/payments', label: 'Pagos',        icon: '💳', roles: ['OPERATOR','ADMIN'] },
  { to: '/dashboard/zones',    label: 'Zonas Azules', icon: '🔵', roles: ['ADMIN'] },
  { to: '/dashboard/users',    label: 'Usuarios',     icon: '👥', roles: ['ADMIN'] },
  { to: '/dashboard/audit',    label: 'Auditoría',    icon: '📋', roles: ['ADMIN'] },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const visibleLinks = links.filter(l => l.roles.includes(user?.role));

  return (
    <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <span className="text-2xl font-black text-emerald-500">PAYPAR</span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {visibleLinks.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm ${
                isActive
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
              }`
            }
          >
            <span>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">
            {user?.firstName?.[0]?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.firstName}</p>
            <p className="text-slate-500 text-xs truncate">{user?.role}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full text-left text-slate-400 hover:text-red-400 text-sm transition-colors px-2 py-1"
        >
          ← Cerrar sesión
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
