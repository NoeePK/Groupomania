import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/forms/RegisterForm";

const Register = () => {
    return (
        <>
            <RegisterForm />
            <Link to="/login">Déjà inscrit.e ? Se connecter</Link>
        </>
    );
};

export default Register;
