import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Public pages
import Home           from '../pages/Home/Home';
import Auth           from '../pages/Auth/Auth';
import Parking        from '../pages/Parking/Parking';
import PaymentResult  from '../pages/PaymentResult/PaymentResult';

// Citizen pages (logged in CLIENT)
import Map            from '../pages/Map/Map';
import Vehicles       from '../pages/Vehicles/Vehicles';
import SessionStart   from '../pages/Session/SessionStart';
import SessionActive  from '../pages/Session/SessionActive';
import Payment        from '../pages/Payment/Payment';
import History        from '../pages/History/History';

// Dashboard pages (OPERATOR / ADMIN)
import Dashboard          from '../pages/Dashboard/Dashboard';
import DashboardTickets   from '../pages/DashboardTickets/DashboardTickets';
import DashboardPayments  from '../pages/DashboardPayments/DashboardPayments';
import DashboardZones     from '../pages/DashboardZones/DashboardZones';
import DashboardUsers     from '../pages/DashboardUsers/DashboardUsers';
import DashboardAudit     from '../pages/DashboardAudit/DashboardAudit';

const AppRouter = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* ── Public ──────────────────────────────── */}
        <Route path="/"               element={<Home />} />
        <Route path="/auth"           element={<Auth />} />
        <Route path="/parking"        element={<Parking />} />
        <Route path="/payment-result" element={<PaymentResult />} />

        {/* ── Citizen (any logged-in user) ────────── */}
        <Route path="/map"            element={<Map />} />
        <Route path="/vehicles"       element={<Vehicles />} />
        <Route path="/session/start"  element={<SessionStart />} />
        <Route path="/session/active" element={<SessionActive />} />
        <Route path="/payment"        element={<Payment />} />
        <Route path="/history"        element={<History />} />

        {/* ── Dashboard — OPERATOR + ADMIN ────────── */}
        <Route path="/dashboard" element={
          <ProtectedRoute roles={['OPERATOR', 'ADMIN']}><Dashboard /></ProtectedRoute>
        } />
        <Route path="/dashboard/tickets" element={
          <ProtectedRoute roles={['OPERATOR', 'ADMIN']}><DashboardTickets /></ProtectedRoute>
        } />
        <Route path="/dashboard/payments" element={
          <ProtectedRoute roles={['OPERATOR', 'ADMIN']}><DashboardPayments /></ProtectedRoute>
        } />

        {/* ── Dashboard — Solo ADMIN ──────────────── */}
        <Route path="/dashboard/zones" element={
          <ProtectedRoute roles={['ADMIN']}><DashboardZones /></ProtectedRoute>
        } />
        <Route path="/dashboard/users" element={
          <ProtectedRoute roles={['ADMIN']}><DashboardUsers /></ProtectedRoute>
        } />
        <Route path="/dashboard/audit" element={
          <ProtectedRoute roles={['ADMIN']}><DashboardAudit /></ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default AppRouter;
