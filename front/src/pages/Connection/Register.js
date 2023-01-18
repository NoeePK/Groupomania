import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";

const Register = () => {
    return (
        <>
            <RegisterForm />
            <p>
                Déjà inscrit.e ?<br />
                <Link to="/login"> Se connecter</Link>
            </p>
        </>
    );
};

export default Register;
