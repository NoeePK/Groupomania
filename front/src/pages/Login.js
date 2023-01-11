// Se déconnecter
// Session s'arrête quand user se déconnecte
import React from "react";
import { Link } from "react-router-dom";
import Form from "../components/forms/ConnectForm";

const Login = () => {
    return (
        <section className="main-container">
            <h1>Bienvenue sur Groupomania</h1>
            <Form title="Se connecter" route="login" text="" />
            <Link to="/Register">
                Vous n'avez pas de compte ? Venez vous inscrire ici
            </Link>
        </section>
    );
};

export default Login;
