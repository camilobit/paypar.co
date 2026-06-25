import Sidebar from '../components/Sidebar/Sidebar';

const DashboardLayout = ({ children }) => (
  <div className="flex h-screen bg-slate-900 overflow-hidden">
    <Sidebar />
    <main className="flex-1 overflow-auto p-6">{children}</main>
  </div>
);

export default DashboardLayout;
