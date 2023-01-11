import { Link } from "react-router-dom";
import Form from "../components/forms/RegisterForm";

const Register = () => {
    return (
        <>
            <Form />
            <Link to="/">Déjà inscrit.e ? Se connecter</Link>
        </>
    );
};

export default Register;
