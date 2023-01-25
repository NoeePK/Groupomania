import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";
import logo from "../../assets/logo-black.svg"

const Register = () => {
    return (
        <main>
            <section className="connection-container">
                <img src={logo}/>
                <RegisterForm />
            </section>
            <div className="connection-link">
                <p>Déjà inscrit.e ?</p>
                <Link to="/login"> Se connecter</Link>
            </div>
        </main>
    );
};

export default Register;
