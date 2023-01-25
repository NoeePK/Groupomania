// Se déconnecter
// Session s'arrête quand user se déconnecte
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import logo from "../../assets/logo-black.svg";

const Login = () => {
    return (
        <main>
            <section className="main-container">
                <img
                    src={logo}
                    alt="Logo de Groupomania"
                    className="main-logo"
                />
                <LoginForm />
            </section>

            <div className="link-container">
                <p>Vous n'avez pas de compte ?</p>
                <Link to="/register">Venez vous inscrire ici</Link>
            </div>
        </main>
    );
};

export default Login;
