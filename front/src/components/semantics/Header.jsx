import React from "react";
import { Link } from "react-router-dom";
import {fetchDatas} from "../../api/handleData";
import { API_ROUTES } from "../../api/api_routes";
import logout from "../../assets/logout.svg";
import logo from "../../assets/logo-white.svg";

const Header = () => {
    const MYPROFILE_URL = API_ROUTES.myself;
    const profile = fetchDatas(MYPROFILE_URL);

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
