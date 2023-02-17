import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // Emplacement AVANT d'être redirigé vers Login OU arriver sur la page d'accueil
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
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            console.log("Datas envoyées au serveur");
            setAuth({ email, password, roles, accessToken });
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
        <main>
            <section className="log-container">
                <p
                    ref={errRef}
                    className="error-message"
                    hidden={errMsg ? false : true}
                    aria-live="assertive">
                    {errMsg}
                </p>
                <h1>Se connecter</h1>

                <form className="log-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Entrez votre adresse mail"
                        required
                    />

                    <label htmlFor="password">Mot de passe :</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                    <button disabled={!email || !password ? true : false}>
                        Se connecter
                    </button>
                </form>
            </section>

            <div className="link-container">
                <p>Vous n'avez pas de compte ?</p>
                <Link to="/register">Venez vous inscrire ici</Link>
            </div>
        </main>
    );
};

export default Login;
