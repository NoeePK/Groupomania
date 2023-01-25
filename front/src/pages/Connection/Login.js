// Se déconnecter
// Session s'arrête quand user se déconnecte
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../../components/forms/LoginForm";
import logo from "../../assets/logo-black.svg";

const Login = () => {
    return (
        <main>
            <section className="connection-container">
                <img src={logo} />
                <LoginForm />
            </section>

            <div className="connection-link">
                <p>Vous n'avez pas de compte ?</p>
                <Link to="/register">Venez vous inscrire ici</Link>
            </div>
        </main>
    );
};

export default Login;
