import Sidebar from '../components/Sidebar/Sidebar';

const DashboardLayout = ({ children }) => (
  <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--gray-50)' }}>
    <Sidebar />
    <main style={{ flex: 1, overflow: 'auto', padding: '2rem' }}>
      <div className="page-enter" style={{ maxWidth: 1100 }}>
        {children}
      </div>
    </main>
  </div>
);

export default DashboardLayout;
