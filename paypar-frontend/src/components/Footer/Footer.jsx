import './footer.css';
const Footer = () => (
  <footer className="footer">
    <p>© {new Date().getFullYear()} PAYPAR — Sistema inteligente de parqueadero · <a href="https://paypar.co" className="hover:text-emerald-400 transition-colors">paypar.co</a></p>
  </footer>
);
export default Footer;
