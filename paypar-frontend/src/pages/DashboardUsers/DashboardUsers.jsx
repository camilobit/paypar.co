import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { api } from '../../services/api';

const ROLE_LABELS = {
  CLIENT:   { label: 'Conductor', color: 'bg-slate-700 text-slate-300' },
  OPERATOR: { label: 'Operador',  color: 'bg-blue-500/10 text-blue-400' },
  ADMIN:    { label: 'Admin',     color: 'bg-emerald-500/10 text-emerald-400' },
};

const DashboardUsers = () => {
  const [users,    setUsers]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error,    setError]    = useState('');
  const [form, setForm] = useState({
    email: '', password: '', firstName: '', lastName: '', phone: '',
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.getUsers();
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleCreateOperator = async (e) => {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      await api.createOperator(form);
      setForm({ email: '', password: '', firstName: '', lastName: '', phone: '' });
      setShowForm(false);
      await fetchUsers();
    } catch (err) {
      setError(err.message || 'No se pudo crear el operador');
    } finally {
      setCreating(false);
    }
  };

  const handleToggle = async (userId) => {
    try {
      await api.toggleUserActive(userId);
      await fetchUsers();
    } catch {
      alert('No se pudo cambiar el estado del usuario');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Usuarios</h1>
            <p className="text-slate-400 text-sm mt-1">Conductores, operadores y administradores</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Nuevo operador'}
          </Button>
        </div>

        {showForm && (
          <form
            onSubmit={handleCreateOperator}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-3"
          >
            <h2 className="text-white font-semibold mb-2">Crear operador de parqueadero</h2>
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Input label="Nombre" name="firstName" value={form.firstName} onChange={handleChange} required />
              <Input label="Apellido" name="lastName" value={form.lastName} onChange={handleChange} required />
            </div>
            <Input label="Correo" name="email" type="email" value={form.email} onChange={handleChange} required />
            <Input label="Contraseña temporal" name="password" type="password" value={form.password} onChange={handleChange} required />
            <Input label="Teléfono (opcional)" name="phone" value={form.phone} onChange={handleChange} />
            <Button type="submit" loading={creating} className="w-full">
              Crear operador
            </Button>
          </form>
        )}

        <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-900/50">
                <tr className="text-slate-400 text-left">
                  <th className="px-6 py-3 font-medium">Nombre</th>
                  <th className="px-6 py-3 font-medium">Correo</th>
                  <th className="px-6 py-3 font-medium">Rol</th>
                  <th className="px-6 py-3 font-medium">Estado</th>
                  <th className="px-6 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {users.map((u) => {
                  const roleInfo = ROLE_LABELS[u.role?.name] || ROLE_LABELS.CLIENT;
                  return (
                    <tr key={u.id} className="text-slate-300 hover:bg-slate-700/50">
                      <td className="px-6 py-4 text-white">{u.firstName} {u.lastName}</td>
                      <td className="px-6 py-4 text-slate-400">{u.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${roleInfo.color}`}>
                          {roleInfo.label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                          u.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {u.isActive ? 'Activo' : 'Inactivo'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggle(u.id)}
                          className="text-slate-400 hover:text-white text-xs underline"
                        >
                          {u.isActive ? 'Desactivar' : 'Activar'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardUsers;
