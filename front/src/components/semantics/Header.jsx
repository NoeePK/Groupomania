import React from "react";
import Navigation from "./Navigation";
import image from "../../assets/logo-white.svg";

const Header = () => {
    return (
        <header>
            <img src={image} alt="Logo de Groupomania"></img>
            <Navigation />
        </header>
    );
};

export default Header;
