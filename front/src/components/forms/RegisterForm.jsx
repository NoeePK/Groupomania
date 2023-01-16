import React, { useState, useEffect, useRef } from "react";
import axios from "../../context/AuthProvider";
const REGISTER_URL = "/register";
const EMAIL_REGEX =
    /[a-zA-Z0-9æœ.!#$%&’*+/=?^_`{|}~"(),:;<>@[\]-]+@([\w-]+\.)+[\w-]{2,3}$/i;
const PWD_REGEX =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$";

const RegisterForm = () => {
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
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    // Valider mot de passe
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidEmail(result);
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
                    withCredentials: true,
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
        <section className="register-container">
            <h1>Inscription</h1>
            <p
                ref={errRef}
                className="error-message"
                hidden={errMsg ? false : true}
                aria-live="assertive">
                {errMsg}
            </p>
            <form className="register-form" onSubmit={handleSubmit}>
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
                        aria-describedby="instructions"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                        placeholder="example@gmail.com"
                        required
                    />
                    <p
                        id="instructions"
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
                        aria-describedby="passwordinstructions"
                        onFocus={() => setPasswordFocus(true)}
                        onBlur={() => setPasswordFocus(false)}
                        required
                    />
                    <p
                        id="passwordinstructions"
                        className={
                            passwordFocus && password && !validPassword
                                ? "instructions"
                                : "offscreen"
                        }>
                        Votre mot de passe doit contenir au minimum : 8
                        caractères, 1 majuscule, 1 minuscule et 3 nombres
                    </p>
                </label>

                <button disabled={!validEmail || !validPassword ? true : false}>
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
