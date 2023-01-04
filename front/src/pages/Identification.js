// Se déconnecter
// Session s'arrête quand user se déconnecte

import React from "react";
import SignInUp from "../components/identification/SignUp";
import image from "../assets/icon-left-font-monochrome-black.svg";

const Identification = () => {
    const [registredUser, setToggle] = useState(false);
    const newUser = () => {
        setToggle(!registredUser);
    };

    return (
        <section className="main-container">
            <h1>Bienvenue sur Groupomania</h1>
            <img src={image} alt="Logo de Groupomania"></img>

            <Button text="S'inscrire" onClick={newUser} />
            <Button text="Se connecter" onClick={registredUser} />

            <div className="newUser" hidden={newUser ? false : true}>
                <SignInUp
                    title="S'inscrire"
                    text="Déjà inscrit.e ?"
                    button={registredUser}
                />
            </div>
            <div
                className="registredUser"
                hidden={registredUser ? false : true}>
                <SignInUp
                    title="Se connecter"
                    text="Pas encore inscrit.e ?"
                    button={newUser}
                />
            </div>
        </section>
    );
};

export default Identification;
