import React from "react";
import image from "../../assets/logo-white.svg";

const Footer = () => {
    return (
        <footer>
            <img
                className="footer-logo"
                src={image}
                alt="Logo de Groupomania"></img>
            <p>© 2022. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
