import './hero.css';

const Hero = () => (
  <section className="hero-section">
    <div className="hero-background"></div>
    <div className="hero-content">
      <span className="hero-badge">🚗 Plataforma inteligente de parqueadero</span>
      <h1 className="hero-title">Paga tu parqueadero<span> sin filas</span></h1>
      <p className="hero-description">Gestiona el pago y validación de tu ticket desde tu celular de forma rápida y segura.</p>
      <div className="hero-buttons">
        <a href="#buscar" className="hero-primary-btn">Consultar mi placa</a>
        <a href="#funciona" className="hero-secondary-btn">Ver cómo funciona</a>
      </div>
    </div>
  </section>
);
export default Hero;
