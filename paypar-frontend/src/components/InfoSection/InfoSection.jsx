import './info-section.css';

const cards = [
  { icon: '⚡', title: 'Pago rápido', desc: 'Reduce tiempos de espera en parqueadero.' },
  { icon: '🎟', title: 'Validaciones', desc: 'Aplica beneficios de tiendas y centros comerciales.' },
  { icon: '🔵', title: 'Zonas Azules', desc: 'Control inteligente del estacionamiento urbano.' },
  { icon: '🔒', title: 'Seguridad', desc: 'Información protegida y transacciones cifradas.' },
];

const InfoSection = () => (
  <section className="info-section" id="beneficios">
    <div className="max-w-5xl mx-auto text-center mb-10">
      <h2 className="text-3xl font-bold text-slate-900 mb-3">¿Por qué PAYPAR?</h2>
      <p className="text-slate-500">La forma más fácil de gestionar tu estacionamiento en Colombia</p>
    </div>
    <div className="info-grid">
      {cards.map((c) => (
        <div key={c.title} className="info-card">
          <h3>{c.icon} {c.title}</h3>
          <p>{c.desc}</p>
        </div>
      ))}
    </div>
  </section>
);
export default InfoSection;
