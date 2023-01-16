import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
const LOGIN_URL = "/auth";

const LoginForm = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    // Emplacement AVANT d'être redirigé vers Login
    // OU arriver sur la page d'accueil
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    // Focaliser sur input "email"
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // Mettre à jour message d'erreur pendant la saisie
    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            // Pour admin etc
            // const roles = response?.data?.roles;
            setAuth({ email, password, accessToken });
            // Vider les inputs
            setEmail("");
            setPassword("");
            navigate(from, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("Le serveur ne répond pas");
            } else if (error.response?.status === 400) {
                setErrMsg("Veuillez remplir tous les champs ");
            } else if (error.response?.status === 401) {
                setErrMsg("Accès non-autorisé");
            } else {
                setErrMsg("La connexion a échouée");
            }
            // Pour les lecteurs d'écran :
            errRef.current.focus();
        }
    };

    return (
        <section className="login-container">
            <h1>Se connecter</h1>
            <p
                ref={errRef}
                className="error-message"
                hidden={errMsg ? false : true}
                aria-live="assertive">
                {errMsg}
            </p>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Courriel
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                        required
                    />
                </label>
                <label htmlFor="password">
                    Mot de passe
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button disabled={!email || !password ? true : false}>
                    Se connecter
                </button>
            </form>
        </section>
    );
};

export default LoginForm;
