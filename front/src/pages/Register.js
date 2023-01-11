import { Link } from "react-router-dom";
import Form from "../components/forms/ConnectForm";

const Register = () => {
    return (
        <>
            <Form
                title="S'inscrire"
                route="register"
                text="Dès votre inscription effectuée, vous aurez la possibilité de
                créer votre profil."
            />
            <Link to="/">Déjà inscrit.e ? Se connecter</Link>
        </>
    );
};

export default Register;
