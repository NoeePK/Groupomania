import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

// Hook pour utiliser l'authentification
const useAuth = () => {
    return useContext(AuthContext);
};

export default useAuth;
