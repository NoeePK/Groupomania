import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import logoMail from "../../assets/logo-mail.svg";
import logoPwd from "../../assets/logo-pwd.svg";
import warning from "../../assets/warning.svg";
const REGISTER_URL = "/register";

const EMAIL_REGEX =
    /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,3}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;

const Register = () => {
    const { setAuth } = useAuth();

    // const navigate = useNavigate();
    // Arriver sur la page d'accueil
    // const to = "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [match, setMatch] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    // Focaliser sur input "email"
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // Valider email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    // Valider mot de passe
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        console.log(match);
        setValidPassword(result);
        const matchPwd = password === match;
        setValidMatch(matchPwd);
    }, [password, match]);

    // Mettre à jour message d'erreur pendant la saisie
    useEffect(() => {
        setErrMsg("");
    }, [email, password, match]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            console.log(response.data);
            const accessToken = response?.data?.accessToken;
            // Pour admin etc
            // const roles = response?.data?.roles;
            setAuth({ email, password, accessToken });
            // Vider les inputs
            setEmail("");
            setPassword("");
        } catch (error) {
            if (!error?.response) {
                setErrMsg("Le serveur ne répond pas");
            } else if (error.response?.status === 400) {
                setErrMsg("Veuillez remplir tous les champs ");
            } else {
                setErrMsg("L'inscription a échouée");
            }
            // Pour les lecteurs d'écran :
            errRef.current.focus();
        }
    };

    return (
        <main>
            <section className="main-container">
                <section className="log-container">
                    <h1>Inscription</h1>
                    <p
                        ref={errRef}
                        className="error-message"
                        hidden={errMsg ? false : true}
                        aria-live="assertive">
                        <img
                            src={warning}
                            alt="Attention !"
                            hidden={errMsg ? false : true}
                        />
                        {errMsg}
                    </p>
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
                            ref={emailRef}
                            autoComplete="off"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="mailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            placeholder="Entrez votre adresse mail"
                            required
                        />
                        <p
                            id="mailnote"
                            className={
                                emailFocus && email && !validEmail
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            Ce champs doit contenir une adresse email contenant
                            un @.
                        </p>

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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-invalid={validPassword ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                        <p
                            id="pwdnote"
                            className={
                                passwordFocus && password && !validPassword
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            Votre mot de passe doit contenir au minimum : 8
                            caractères, 1 majuscule, 1 minuscule et 3 chiffres.
                        </p>

                        <label htmlFor="confirmPwd">
                            <img
                                src={logoPwd}
                                alt="Confirmez votre mot de passe"
                            />
                            <h2>Confirmez le mot de passe</h2>
                        </label>
                        <input
                            type="password"
                            id="confirmPwd"
                            value={match}
                            onChange={(e) => setMatch(e.target.value)}
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="matchnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                            placeholder="Entrez votre mot de passe"
                            required
                        />
                        <p
                            id="matchnote"
                            className={
                                matchFocus && !validMatch
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            Les mots de passe doivent être identiques.
                        </p>

                        <button
                            disabled={
                                !validEmail || !validPassword || !validMatch
                                    ? true
                                    : false
                            }>
                            S'inscrire
                        </button>
                    </form>
                </section>
            </section>
            <div className="link-container">
                <p>Déjà inscrit.e ?</p>
                <Link to="/login"> Se connecter</Link>
            </div>
        </main>
    );
};

export default Register;
