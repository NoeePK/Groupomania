import axios from "axios";
import React, { useState } from "react";

// Ajouter les messages d'erreurs en direct dans le span

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password,
        };

        axios({
            url: `http://localhost:8080/api/auth/register`,
            method: "POST",
            data: payload,
        })
            .then(() => {
                console.log("Datas envoyées au serveur");
                // resetUserInputs();
            })
            .catch(() => {
                console.log("Erreur serveur");
            });
    };

    console.log(email);
    console.log(password);

    return (
        <section className="register-container">
            <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
                <h1>Inscription</h1>
                <label>
                    Courriel
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="example@gmail.com"
                        required
                    />
                    <span className="errorMessage"></span>
                </label>
                <label>
                    Mot de passe
                    <input
                        type="password"
                        name="passeword"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />
                    <span className="errorMessage"></span>
                </label>

                <button type="submit" value="Submit">
                    S'inscrire
                </button>
            </form>
            <p>
                Dès votre inscription effectuée, vous aurez la possibilité de
                créer votre profil.
            </p>
        </section>
    );
};

export default RegisterForm;
