import React from "react";
import { Link } from "react-router-dom";
import getDatas from "../../api/datas";
const PROFILES_URL = "/profiles";

const Navigation = () => {
    const profile = getDatas(PROFILES_URL);

    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to={`/Profile/${profile.id}`}>Profil</Link>
            <Link to={"/Publish"}>Publier</Link>
            <div>Se déconnecter</div>
        </nav>
    );
};

export default Navigation;
