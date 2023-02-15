import React from "react";
import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import warning from "../../assets/warning.svg";
import { REGEX } from "../../components/config/regex";
const emailReg = REGEX.email;
const pwdReg = REGEX.pwd;
const REGISTER_URL = "/api/user/register";

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatch] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = emailReg.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = pwdReg.test(password);
        console.log(result);
        console.log(password);
        console.log(matchPwd);
        setValidPassword(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd]);

    // Mettre à jour message d'erreur pendant la saisie
    useEffect(() => {
        setErrMsg("");
    }, [email, password, matchPwd]);

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
            console.log(response.token);
            setSuccess(true)
        } catch (error) {}
    };

    return (
        <>
            {success ? (
                <section>
                    <h1>success !</h1>
                </section>
            ) : (
                <main>
                    <section className="log-container">
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

                        <h1>Register</h1>
                        <form className="log-form" onSubmit={handleSubmit}>
                            <label htmlFor="email">Email :</label>
                            <input
                                type="email"
                                id="email"
                                ref={userRef}
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="mailnote"
                                placeholder="Entrez votre adresse mail"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p
                                id="mailnote"
                                className={
                                    email && !validEmail
                                        ? "instructions"
                                        : "offscreen"
                                }>
                                Ce champs doit contenir une adresse email
                                contenant un @.
                            </p>

                            <label htmlFor="password">Mot de passe :</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                                placeholder="Entrez votre mot de passe"
                            />
                            <p
                                id="pwdnote"
                                className={
                                    password && !validPassword
                                        ? "instructions"
                                        : "offscreen"
                                }>
                                Votre mot de passe doit contenir au minimum : 8
                                caractères, 1 majuscule, 1 minuscule et 3
                                chiffres.
                            </p>

                            <label htmlFor="confirmPwd">
                                Confirmez le mot de passe :
                            </label>
                            <input
                                type="password"
                                id="confirmPwd"
                                value={matchPwd}
                                onChange={(e) => setMatch(e.target.value)}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="matchnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                                placeholder="Entrez votre mot de passe"
                            />
                            <p
                                id="matchnote"
                                className={
                                    matchPwd && !validMatch
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
                    <div className="link-container">
                        <p>Déjà inscrit.e ?</p>
                        <Link to="/login"> Se connecter</Link>
                    </div>
                </main>
            )}
        </>
    );
};

export default Register;
