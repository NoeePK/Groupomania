import React from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/handleData";

import logout from "../../assets/logout.svg";
import logo from "../../assets/logo-white.svg";

const PROFILES_URL = "/profiles";

const Header = () => {
    const profile = fetchData(PROFILES_URL);

    return (
        <header>
            <img src={logo} alt="Logo de Groupomania"></img>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to={`/Profile/${profile.id}`}>Profil</Link>
                <Link to={"/Publish"}>Publier</Link>
                <Link to={"/About"}>A propos</Link>
                <div className="logout-button">
                    <img src={logout} alt="Se déconnecter" />
                </div>
            </nav>
        </header>
    );
};

export default Header;
