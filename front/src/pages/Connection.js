//Créer un compte
// Se connecter
// Se déconnecter
// Session s'arrête quand user se déconnecte

import React from "react";
import Button from "../components/Button";
import image from "../assets/icon-left-font-monochrome-black.svg";

const Connection = () => {
    return (
        <section className="main-container">
            <img src={image} alt="Logo de Groupomania"></img>
            <div className="connection-container">
                <form className="connection">
                    <label>
                        Courriel
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Mot de passe
                        <input type="password" name="passeword" required />
                    </label>
                    <input type="submit" value="Submit">
                        <Button text="Se connecter" />
                    </input>
                </form>
            </div>
        </section>
    );
};

export default Connection;
