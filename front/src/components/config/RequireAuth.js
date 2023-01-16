import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        // SI : utilisateur est authentifié
        auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
            // SOIT : il a accès à la page qu'il a demandée
            <Outlet />
        ) : // SOIT : il n'a pas accès à la page qu'il a demandée
        auth?.user ? (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        ) : (
            // SINON : utilisateur n'est pas authentifié,
            // Donc, il est renvoyé vers la page de connexion
            <Navigate to="/login" state={{ from: location }} replace />
        )
    );
};

export default RequireAuth;
