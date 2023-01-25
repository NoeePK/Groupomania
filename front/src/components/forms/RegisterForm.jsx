import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
const REGISTER_URL = "/register";

const EMAIL_REGEX =
    /^[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,3}$/;
const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,24}$/;

const RegisterForm = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    // Arriver sur la page d'accueil
    const to = "/";

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    // Focaliser sur input "email"
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // Valider email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    // Valider mot de passe
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
    }, [password]);

    // Mettre à jour message d'erreur pendant la saisie
    useEffect(() => {
        setErrMsg("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                REGISTER_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    
                }
            );
            console.log(JSON.stringify(response.data));
            const accessToken = response?.data?.accessToken;
            // Pour admin etc
            // const roles = response?.data?.roles;
            setAuth({ email, password, accessToken });
            // Vider les inputs
            setEmail("");
            setPassword("");
            navigate(to, { replace: true });
        } catch (error) {
            if (!error?.response) {
                setErrMsg("Le serveur ne répond pas");
            } else {
                setErrMsg("L'inscription a échouée");
            }
            // Pour les lecteurs d'écran :
            errRef.current.focus();
        }
    };

    return (
        <section className="log-container">
            <h1>Inscription</h1>
            <p
                ref={errRef}
                className="error-message"
                hidden={errMsg ? false : true}
                aria-live="assertive">
                {errMsg}
            </p>
            <form className="log-form" onSubmit={handleSubmit}>
                <label htmlFor="email">
                    Courriel
                    <input
                        type="email"
                        id="email"
                        name="email"
                        ref={emailRef}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailInstructions"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="example@gmail.com"
                        required
                    />
                    <p
                        id="emailInstructions"
                        className={
                            emailFocus && email && !validEmail
                                ? "instructions"
                                : "offscreen"
                        }>
                        Ce champs doit contenir une adresse email contenant un @
                        et suivant le format de l'entreprise
                    </p>
                </label>
                <label htmlFor="password">
                    Mot de passe
                    <input
                        type="password"
                        id="password"
                        name="passeword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={validPassword ? "false" : "true"}
                        aria-describedby="passwordInstructions"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        required
                    />
                    <p
                        id="passwordInstructions"
                        className={
                            passwordFocus && password && !validPassword
                                ? "instructions"
                                : "offscreen"
                        }>
                        Votre mot de passe doit contenir au minimum : 8
                        caractères, 1 majuscule, 1 minuscule et 3 chiffres
                    </p>
                </label>

                <button disabled={!email || !password ? true : false}>
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
