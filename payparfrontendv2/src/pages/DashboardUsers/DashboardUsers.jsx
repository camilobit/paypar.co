import { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const USERS = [
  { id: 'u1', name: 'Juan García',  email: 'juan@paypar.co',    role: 'OPERATOR', active: true },
  { id: 'u2', name: 'María López',  email: 'maria@paypar.co',   role: 'OPERATOR', active: true },
  { id: 'u3', name: 'Admin PAYPAR', email: 'admin@paypar.co',   role: 'ADMIN',    active: true },
  { id: 'u4', name: 'Carlos Pérez', email: 'carlos@ejemplo.com', role: 'CLIENT',  active: true },
];
const BADGE = { ADMIN: 'badge-blue', OPERATOR: 'badge-green', CLIENT: 'badge-gray' };

const DashboardUsers = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <DashboardLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--gray-900)', marginBottom: 4 }}>Usuarios</h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--gray-500)' }}>Conductores, operadores y administradores</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancelar' : '+ Nuevo operador'}</Button>
      </div>

      {showForm && (
        <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: 600, marginBottom: '1rem' }}>Crear operador</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <Input label="Nombre" placeholder="Juan" />
            <Input label="Apellido" placeholder="García" />
          </div>
          <div style={{ marginTop: '0.75rem' }}><Input label="Correo" type="email" placeholder="operador@paypar.co" /></div>
          <div style={{ marginTop: '0.75rem' }}><Input label="Contraseña" type="password" placeholder="Min. 8 caracteres" /></div>
          <Button variant="success" size="md" style={{ marginTop: '1rem' }}>Crear operador</Button>
        </div>
      )}

      <div className="card" style={{ overflow: 'hidden' }}>
        <table className="table-base">
          <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Estado</th><th></th></tr></thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id}>
                <td style={{ fontWeight: 500, color: 'var(--gray-900)' }}>{u.name}</td>
                <td style={{ color: 'var(--gray-500)' }}>{u.email}</td>
                <td><span className={`badge ${BADGE[u.role]}`}>{u.role}</span></td>
                <td><span className="badge badge-green">Activo</span></td>
                <td><button style={{ fontSize: '0.8125rem', color: 'var(--gray-400)', background: 'none', border: 'none', cursor: 'pointer' }}>Desactivar</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
};
export default DashboardUsers;
