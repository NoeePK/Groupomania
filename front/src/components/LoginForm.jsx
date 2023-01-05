import React, { useState } from "react";
import Button from "./Button";

// Ajouter les messages d'erreurs en direct dans le span

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <section className="login-container">
            <h1>{props.title}</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Courriel
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required
                    />
                    <span className="errorMessage"></span>
                </label>
                <label>
                    Mot de passe
                    <input
                        type="password"
                        id="password"
                        name="passeword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="errorMessage"></span>
                </label>

                <Button text={props.title} type="submit" value="Submit" />
            </form>
            <p>{props.text}</p>
        </section>
    );
};

export default LoginForm;
