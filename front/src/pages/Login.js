// Se déconnecter
// Session s'arrête quand user se déconnecte

import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import Button from "../components/Button";

const Login = () => {
    const [toggleIsClosed, setToggle] = useState(false);
    const toggleIsOpen = () => {
        setToggle(!toggleIsClosed);
    };

    return (
        <section className="main-container">
            <h1>Bienvenue sur Groupomania</h1>
            <div className="toggleIsClosed" onClick={toggleIsOpen}>
                <h2>Se connecter</h2>
            </div>
            <div hidden={toggleIsClosed ? true : false}>
                <LoginForm title="Se connecter" />
            </div>

            <div className="toggleIsOpen" onClick={toggleIsOpen}>
                <h2>S'inscrire</h2>
            </div>
            <div hidden={toggleIsClosed ? false : true}>
                <LoginForm
                    title="S'inscrire"
                    text="Dès votre inscription effectuée, vous aurez la possibilité de créer votre profil."
                />
            </div>
        </section>
    );
};

export default Login;
