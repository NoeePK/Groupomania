import React from "react";
import { Link } from "react-router-dom";
import getDatas from "../../api/datas";

import image from "../../assets/logo-white.svg";

const PROFILES_URL = "/profiles";

const Header = () => {
    const profile = getDatas(PROFILES_URL);

    return (
        <header>
            <img src={image} alt="Logo de Groupomania"></img>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to={`/Profile/${profile.id}`}>Profil</Link>
                <Link to={"/Publish"}>Publier</Link>
                <div>Se déconnecter</div>
            </nav>
        </header>
    );
};

export default Header;
