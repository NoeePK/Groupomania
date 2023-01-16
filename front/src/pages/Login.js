// Se déconnecter
// Session s'arrête quand user se déconnecte
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";

const Login = () => {
    return (
        <section className="main-container">
            <h1>Bienvenue sur Groupomania</h1>
            <LoginForm />
            <p>
                Vous n'avez pas de compte ?<br />
                <Link to="/register">Venez vous inscrire ici</Link>
            </p>
        </section>
    );
};

export default Login;
