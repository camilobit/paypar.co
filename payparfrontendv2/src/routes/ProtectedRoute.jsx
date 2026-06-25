import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user)   return <Navigate to="/auth" replace />;
  if (roles.length > 0 && !roles.includes(user.role))
    return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
