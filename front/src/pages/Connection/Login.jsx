// Se déconnecter
// Session s'arrête quand user se déconnecte
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { API_ROUTES } from "../../api/api_routes";
import logoMail from "../../assets/logo-mail.svg";
import logoPwd from "../../assets/logo-pwd.svg";
import warning from "../../assets/warning.svg";

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
                API_ROUTES.login,
                JSON.stringify({ email, password }),
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                    },
                    withCredentials: true,
                }
            );
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.token;
            // Pour admin etc :
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
        <main>
            <section className="main-container">
                <section className="log-container">
                    <h1>Se connecter</h1>

                    <form className="log-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">
                            <img
                                src={logoMail}
                                alt="Entrez votre adresse mail"
                            />
                            <h2>Courriel</h2>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            ref={emailRef}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Entrez votre adresse mail"
                            required
                        />

                        <label htmlFor="password">
                            <img
                                src={logoPwd}
                                alt="Entrez votre mot de passe"
                            />
                            <h2>Mot de passe</h2>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                        <button disabled={!email || !password ? true : false}>
                            Se connecter
                        </button>
                        <p
                            ref={errRef}
                            className="error-message"
                            hidden={errMsg ? false : true}
                            aria-live="assertive">
                            <img
                                src={warning}
                                alt="Attention ! Erreur réseau"
                                hidden={errMsg ? false : true}
                            />
                            {errMsg}
                        </p>
                    </form>
                </section>
            </section>

            <div className="link-container">
                <p>Vous n'avez pas de compte ?</p>
                <Link to="/register">Venez vous inscrire ici</Link>
            </div>
        </main>
    );
};

export default Login;
