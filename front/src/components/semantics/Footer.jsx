import React from "react";
import image from "../../assets/icon-left-font-monochrome-white.svg";

const Footer = () => {
    return (
        <footer>
            <img
                className="footer-logo"
                src={image}
                alt="Logo de Groupomania"></img>
            <p>© date. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
