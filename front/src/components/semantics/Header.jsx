import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import logo from "../../assets/logo-white.svg";

const Header = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate("/login");
    };

    return (
        <header>
            <img src={logo} alt="Logo de Groupomania"></img>
            <nav>
                <Link to="/">Accueil</Link>
                <Link to={"/updateProfile"}>Mon profil</Link>
                <Link to={"/publish"}>Publier</Link>
                <button onClick={logout}>Déconnexion</button>
            </nav>
        </header>
    );
};

export default Header;
