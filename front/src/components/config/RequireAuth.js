import {useLocation, Navigate, Outlet} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = () => {
    const {auth} = useAuth();
    const location = useLocation();

    return (
        // SI : utilisateur est authentifié
        auth?.user
        // ALORS : il a accès au contenu
        ? <Outlet/> 
        // SINON : il est renvoyé vers la page de connexion
        : <Navigate to="/login" state={{from: location}} replace />
    );
}

export default RequireAuth;