import React from "react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import image from "../assets/icon-left-font-monochrome-black.svg";

const Header = () => {
    return (
        <header>
            <img src={image} alt="Logo de Groupomania"></img>
            <Link to="/Home">Accueil</Link>
            <Link to="/Publish">Publier</Link>
            <div>Se déconnecter</div>
            <Navigation />
        </header>
    );
};

export default Header;
