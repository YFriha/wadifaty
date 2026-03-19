import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

function ProtectedRoute({ children, role }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role && user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;
