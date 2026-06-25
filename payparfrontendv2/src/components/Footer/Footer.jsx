import { Link } from 'react-router-dom';

const Footer = () => (
  <footer style={{ background: 'var(--gray-900)', color: 'var(--gray-400)', marginTop: 'auto' }}>
    <div className="container-app" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.75rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: 6, background: 'var(--blue-600)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--white)' }}>PAYPAR</span>
          </div>
          <p style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
            Plataforma digital de gestión de estacionamiento urbano en Colombia.
          </p>
          <p style={{ fontSize: '0.8rem', marginTop: '0.5rem', color: 'var(--blue-600)' }}>paypar.co</p>
        </div>

        {/* Product */}
        <div>
          <p style={{ fontWeight: 600, color: 'var(--gray-200)', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Producto</p>
          {['Cómo funciona', 'Zonas azules', 'Pago digital', 'Operadores'].map((l) => (
            <a key={l} href="#" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--gray-400)'}
            >{l}</a>
          ))}
        </div>

        {/* Company */}
        <div>
          <p style={{ fontWeight: 600, color: 'var(--gray-200)', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Empresa</p>
          {['Nosotros', 'Municipios aliados', 'Blog', 'Trabaja con nosotros'].map((l) => (
            <a key={l} href="#" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--gray-400)'}
            >{l}</a>
          ))}
        </div>

        {/* Legal */}
        <div>
          <p style={{ fontWeight: 600, color: 'var(--gray-200)', marginBottom: '0.75rem', fontSize: '0.875rem' }}>Legal</p>
          {['Términos de uso', 'Privacidad', 'Política de cookies', 'Soporte'].map((l) => (
            <a key={l} href="#" style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--gray-400)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--gray-400)'}
            >{l}</a>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--gray-800)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.8125rem' }}>© {new Date().getFullYear()} PAYPAR. Todos los derechos reservados. Villavicencio, Meta, Colombia.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {['LinkedIn', 'Instagram', 'Twitter'].map((s) => (
            <a key={s} href="#" style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={(e) => e.target.style.color = 'var(--white)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--gray-500)'}
            >{s}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
