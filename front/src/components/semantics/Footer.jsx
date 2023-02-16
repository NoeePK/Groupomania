import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/logo-white.svg";

const Footer = () => {
    return (
        <footer>
            <img
                className="footer-logo"
                src={image}
                alt="Logo de Groupomania"></img>
            <Link to={"/about"}>Pour en savoir plus sur nous</Link>
            <p>© 2022. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
