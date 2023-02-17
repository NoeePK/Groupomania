import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/unauthorized.svg";

const Unauthorized = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <main className="main-container">
            <img src={logo} alt="403" className="error-logo" />
            <h1>La page que vous demandez requiert un accès administrateur</h1>
            <div className="link-container">
                <p onClick={goBack}>Retourner sur la page précédente</p>
                <Link to="/login">Se connecter</Link>
            </div>
        </main>
    );
};

export default Unauthorized;
