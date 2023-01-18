import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/unauthorized.svg";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section className="error-container">
            <img src={logo} alt="403" className="error-logo" />
            <p>
                La page que vous demandez requiert un accès utilisateur ou
                administrateur
            </p>
            <p onClick={goBack}>Retourner sur la page précédente</p>
            <Link to="/login">Se connecter</Link>
        </section>
    );
};

export default Unauthorized;
