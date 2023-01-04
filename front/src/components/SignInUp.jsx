import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import image from "../assets/icon-left-font-monochrome-black.svg";

const SignInUp = (props) => {
    return (
        <section className="signInUp-container">
            <img src={image} alt="Logo de Groupomania"></img>
            <h1>{props.title}</h1>
            <form className="sign-form">
                <label>
                    Courriel
                    <input type="email" name="email" required />
                </label>
                <label>
                    Mot de passe
                    <input type="password" name="passeword" required />
                </label>

                <Button text={props.title} type="submit" value="Submit" />
            </form>
            <Link to="/Identification" onClick={props.button}>{props.text}</Link>
        </section>
    );
};

export default SignInUp;
