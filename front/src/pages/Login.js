// Se déconnecter
// Session s'arrête quand user se déconnecte

import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import image from "../assets/icon-left-font-monochrome-black.svg";

const Login = () => {
    const [registredUser, setToggle] = useState(false);
    const newUser = () => {
        setToggle(!registredUser);
    };

    return (
        <section className="main-container">
            <h1>Bienvenue sur Groupomania</h1>
            <img src={image} alt="Logo de Groupomania"></img>

            <Button text="S'inscrire" onClick={newUser} />
            <Button text="Se connecter" onClick={registredUser} />

            <div className="newUser" hidden={newUser ? false : true}>
                <LoginForm
                    title="S'inscrire"
                    text="Dès votre inscription effectuée, vous aurez la possibilité de créer votre profil."
                />
            </div>
            <div
                className="registredUser"
                hidden={registredUser ? false : true}>
                <LoginForm title="Se connecter" />
            </div>
        </section>
    );
};

export default Login;
