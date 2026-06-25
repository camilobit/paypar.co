import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = ({ children, noFooter = false }) => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <main style={{ flex: 1, paddingTop: 64 }}>{children}</main>
    {!noFooter && <Footer />}
  </div>
);

export default MainLayout;
