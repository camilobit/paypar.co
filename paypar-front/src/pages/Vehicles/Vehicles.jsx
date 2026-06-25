import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { MOCK_VEHICLES, VEHICLE_TYPES, VEHICLE_BRANDS } from '../../data/mock';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(MOCK_VEHICLES);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ licensePlate: '', brand: '', model: '', color: '', type: 'CAR' });

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const newVehicle = {
      id: `veh-${Date.now()}`,
      ...form,
      licensePlate: form.licensePlate.toUpperCase().replace(/\s/g, ''),
    };
    setVehicles([newVehicle, ...vehicles]);
    setForm({ licensePlate: '', brand: '', model: '', color: '', type: 'CAR' });
    setShowForm(false);
  };

  const handleDelete = (id) => setVehicles(vehicles.filter((v) => v.id !== id));

  const typeInfo = VEHICLE_TYPES.reduce((acc, t) => ({ ...acc, [t.value]: t }), {});

  return (
    <MainLayout noFooter>
      <div className="container-app page-enter" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="text-headline">Mis vehículos</h1>
            <p className="text-body">Administra los vehículos que usas con PAYPAR</p>
          </div>
          <Button variant="primary" size="md" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancelar' : '+ Agregar vehículo'}
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: 'var(--gray-900)' }}>Registrar nuevo vehículo</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <Input label="Placa" name="licensePlate" value={form.licensePlate} onChange={handleChange} placeholder="ABC 123" required style={{ textTransform: 'uppercase', fontFamily: "'Courier New', monospace", fontWeight: 700, letterSpacing: '0.1em' }} />
              <Select label="Tipo de vehículo" name="type" value={form.type} onChange={handleChange} options={VEHICLE_TYPES} required />
              <Select label="Marca" name="brand" value={form.brand} onChange={handleChange} placeholder="Selecciona marca" options={VEHICLE_BRANDS.map((b) => ({ value: b, label: b }))} required />
              <Input label="Modelo" name="model" value={form.model} onChange={handleChange} placeholder="Spark, MT-03..." required />
              <Input label="Color" name="color" value={form.color} onChange={handleChange} placeholder="Rojo, Negro..." required />
            </div>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <Button type="submit" variant="success" size="md">Guardar vehículo</Button>
              <Button type="button" variant="ghost" size="md" onClick={() => setShowForm(false)}>Cancelar</Button>
            </div>
          </form>
        )}

        {vehicles.length === 0 ? (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🚗</p>
            <p style={{ fontWeight: 600, color: 'var(--gray-900)', marginBottom: '0.25rem' }}>No tienes vehículos registrados</p>
            <p className="text-body" style={{ marginBottom: '1.25rem' }}>Agrega tu primer vehículo para empezar a estacionar con PAYPAR.</p>
            <Button variant="primary" size="md" onClick={() => setShowForm(true)}>+ Agregar vehículo</Button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {vehicles.map((v) => (
              <div key={v.id} className="card card-hover" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p className="plate" style={{ fontSize: '1.25rem', color: 'var(--gray-900)', marginBottom: 4 }}>{v.licensePlate}</p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{v.brand} {v.model} · {v.color}</p>
                  </div>
                  <span style={{ fontSize: '1.5rem' }}>{typeInfo[v.type]?.icon || '🚗'}</span>
                </div>
                <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--gray-100)' }}>
                  <span className="badge badge-gray">{typeInfo[v.type]?.label || v.type}</span>
                  <button
                    onClick={() => handleDelete(v.id)}
                    style={{ fontSize: '0.8125rem', color: 'var(--red-500)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Vehicles;
