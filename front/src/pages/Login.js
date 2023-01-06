// Se déconnecter
// Session s'arrête quand user se déconnecte
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
    return (
        <section className="main-container">
            <h1>Bienvenue sur Groupomania</h1>
            <LoginForm title="Se connecter" text="" />
            <Link to="/Register">
                Vous n'avez pas de compte ? Venez vous inscrire ici
            </Link>
        </section>
    );
};

export default Login;
