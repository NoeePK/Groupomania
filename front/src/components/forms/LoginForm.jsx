import axios from "axios";
import React, { useState } from "react";

// Ajouter les messages d'erreurs en direct dans le span

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            email: email,
            password: password,
        };

        axios({
            url: `http://localhost:8080/api/auth/login`,
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
        <section className="login-container">
            <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
                <h1>Se connecter</h1>
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
                    Se connecter
                </button>
            </form>
        </section>
    );
};

export default LoginForm;
