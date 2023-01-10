import axios from "axios";
import React, { useState } from "react";

// Ajouter les messages d'erreurs en direct dans le span

const LoginForm = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/api/user/register", {
                email,
                password,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <section className="login-container">
            <form className="login-form" onSubmit={(e) => {handleSubmit(e)}}>
                <label>
                    Courriel
                    <input
                        type="email"
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
                        name="passeword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="errorMessage"></span>
                </label>

                <input type="submit" value="Submit">
                    {props.title}
                </input>
            </form>
            <p>{props.text}</p>
        </section>
    );
};

export default LoginForm;
