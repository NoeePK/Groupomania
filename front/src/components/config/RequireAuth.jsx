import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

// SI : utilisateur est authentifié
// SOIT : il a accès à la page qu'il a demandée (donc redirigé vers Outlet)
// SOIT : il n'a pas accès à la page qu'il a demandée (donc redirigé vers Unauthorized)
// SINON : utilisateur n'est pas authentifié,
// Donc, il est renvoyé vers la page de connexion

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
