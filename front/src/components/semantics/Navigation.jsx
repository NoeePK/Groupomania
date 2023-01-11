import React from "react";
import { Link } from "react-router-dom";
// const currentUser = userId;
// Récupérer id de l'user et envoyer sur cette page

const Navigation = () => {
    return (
        <nav>
            <Link to="/Home">Accueil</Link>
            <Link to="/Publish">Publier</Link>
            <Link to="/Profile/">Profil</Link>
            <div>Se déconnecter</div>
        </nav>
    );
};

export default Navigation;
