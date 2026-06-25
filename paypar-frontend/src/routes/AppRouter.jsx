import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

import Home              from '../pages/Home/Home';
import Auth               from '../pages/Auth/Auth';
import Parking             from '../pages/Parking/Parking';
import PaymentResult        from '../pages/PaymentResult/PaymentResult';
import Dashboard            from '../pages/Dashboard/Dashboard';
import DashboardTickets     from '../pages/DashboardTickets/DashboardTickets';
import DashboardPayments    from '../pages/DashboardPayments/DashboardPayments';
import DashboardZones       from '../pages/DashboardZones/DashboardZones';
import DashboardUsers       from '../pages/DashboardUsers/DashboardUsers';
import DashboardAudit       from '../pages/DashboardAudit/DashboardAudit';

const AppRouter = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* Públicas */}
        <Route path="/"               element={<Home />} />
        <Route path="/auth"           element={<Auth />} />
        <Route path="/parking"        element={<Parking />} />
        <Route path="/payment-result" element={<PaymentResult />} />

        {/* Dashboard — OPERATOR y ADMIN */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['OPERATOR', 'ADMIN']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/tickets"
          element={
            <ProtectedRoute roles={['OPERATOR', 'ADMIN']}>
              <DashboardTickets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/payments"
          element={
            <ProtectedRoute roles={['OPERATOR', 'ADMIN']}>
              <DashboardPayments />
            </ProtectedRoute>
          }
        />

        {/* Dashboard — Solo ADMIN */}
        <Route
          path="/dashboard/zones"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <DashboardZones />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/users"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <DashboardUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/audit"
          element={
            <ProtectedRoute roles={['ADMIN']}>
              <DashboardAudit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default AppRouter;
