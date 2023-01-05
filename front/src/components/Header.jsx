import React from "react";
import Navigation from "./Navigation";
import image from "../assets/icon-left-font-monochrome-black.svg";

const Header = () => {
    return (
        <header>
            <img src={image} alt="Logo de Groupomania"></img>
            <Navigation />
        </header>
    );
};

export default Header;
