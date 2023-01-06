import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Register = () => {
    return (
        <>
            <LoginForm
                title="S'inscrire"
                text="Dès votre inscription effectuée, vous aurez la possibilité de créer votre profil."
            />
            <Link to="/">Déjà inscrit.e ? Se connecter</Link>
        </>
    );
};

export default Register;
