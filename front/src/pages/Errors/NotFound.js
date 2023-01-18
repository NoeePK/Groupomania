import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/notfound.svg";

const NotFound = () => {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);

    return (
        <section className="error-container">
            <img src={logo} alt="404" className="error-logo" />
            <p>La page que vous demandez n'existe pas</p>
            <p onClick={goBack}>Retourner sur la page précédente</p>
            <Link to="/login">Se connecter</Link>
        </section>
    );
};

export default NotFound;
