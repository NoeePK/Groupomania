
// Se déconnecter
// Session s'arrête quand user se déconnecte

import React from "react";
import { Link } from "react-router-dom";
import image from "../assets/icon-left-font-monochrome-black.svg";

const Identification = () => {
    return (
        <section className="main-container">
            <h1>Bienvenue sur Groupomania</h1>
            <img src={image} alt="Logo de Groupomania"></img>
            <div className="links-container">
                <Link to="/SignInUp" title="Inscription">
                    Inscription
                </Link>
                <Link to="/SignInUp" title="Connexion">
                    Connexion
                </Link>
                <Link to="/SignInUp" title="Connexion">
                    Connexion administrateur
                </Link>
                


            </div>
        </section>
    );
};

export default Identification;
