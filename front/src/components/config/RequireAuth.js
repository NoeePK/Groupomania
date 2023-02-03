import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return auth?.role?.find((allowedAccess) =>
        allowedRoles?.includes(allowedAccess)
    ) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

// Explication :
// SI : utilisateur est authentifié
// SOIT : il a accès à la page qu'il a demandée (donc redirigé vers Outlet)
// SOIT : il n'a pas accès à la page qu'il a demandée (donc redirigé vers Unauthorized)
// SINON : utilisateur n'est pas authentifié,
// Donc, il est renvoyé vers la page de connexion

export default RequireAuth;
