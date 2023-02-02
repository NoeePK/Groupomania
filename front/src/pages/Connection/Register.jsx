import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { REGEX } from "../../components/config/regex";
import { API_ROUTES } from "../../api/api_routes";
import serviceList from "../../api/service_list.json";

import logoMail from "../../assets/logo-mail.svg";
import logoPwd from "../../assets/logo-pwd.svg";
import logoName from "../../assets/id-logo.svg";
import logoService from "../../assets/logo-service.svg";
import warning from "../../assets/warning.svg";


const Register = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

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

    const [firstName, setFirstName] = useState("");
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState("");
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [service, setService] = useState("");

    const [errMsg, setErrMsg] = useState("");

    // Focaliser sur input "email"
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    // Valider les inputs

    useEffect(() => {
        const result = REGEX.email.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = REGEX.pwd.test(password);
        console.log(password);
        console.log(match);
        setValidPassword(result);
        const matchPwd = password === match;
        setValidMatch(matchPwd);
    }, [password, match]);

    useEffect(() => {
        const result = REGEX.name.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    useEffect(() => {
        const result = REGEX.name.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    // Mettre à jour message d'erreur pendant la saisie
    useEffect(() => {
        setErrMsg("");
    }, [email, password, match, firstName, lastName]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            service: service,
        };
        
            axios({
                url: API_ROUTES.register,
                method: "POST",
                data: payload,
            })
            .then(() => {
                console.log("Datas envoyées au serveur")
            }).catch((error) => {
                console.log("erreur serveur", error);
            })
                // .post(API_ROUTES.register, null, {
                //     params: registerData,
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // })
                // .then((res) => {
                //     console.log("RESPONSE RECEIVED : ", res);
                // })
                // .catch((err) => {
                //     console.log("AXIOS ERROR", err);
                // });

            setAuth({ email, password, firstName, lastName, service });
            
            console.log(payload);
            setEmail("");
            setPassword("");
            setFirstName("");
            setLastName("");
            setService("");
            navigate("/");
        // } catch (error) {
        //     if (!error?.response) {
        //         setErrMsg("Le serveur ne répond pas");
        //     } else if (error.response?.status === 400) {
        //         setErrMsg("Veuillez remplir tous les champs ");
        //     } else {
        //         setErrMsg("L'inscription a échouée");
        //     }
        //     // Pour les lecteurs d'écran :
        //     errRef.current.focus();
        // }
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
                        <label htmlFor="firstName">
                            <img src={logoName} alt="Entrez votre prénom" />
                            <h2>Prénom</h2>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            aria-invalid={validFirstName ? "false" : "true"}
                            aria-describedby="namenote"
                            onFocus={() => setFirstNameFocus(true)}
                            onBlur={() => setFirstNameFocus(false)}
                            placeholder="Prénom"
                            required
                        />
                        <p
                            id="namenote"
                            className={
                                firstNameFocus && firstName && !validFirstName
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            Votre nom ne peut pas contenir de chiffres.
                        </p>
                        <label htmlFor="lastName">
                            <img
                                src={logoName}
                                alt="Entrez votre nom de famille"
                            />
                            <h2>Nom de famille</h2>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            aria-invalid={validLastName ? "false" : "true"}
                            aria-describedby="namenote"
                            onFocus={() => setLastNameFocus(true)}
                            onBlur={() => setLastNameFocus(false)}
                            placeholder="Nom de famille"
                            required
                        />
                        <p
                            id="namenote"
                            className={
                                lastNameFocus && lastName && !validLastName
                                    ? "instructions"
                                    : "offscreen"
                            }>
                            Votre nom ne peut pas contenir de chiffres.
                        </p>
                        <label htmlFor="service">
                            <img
                                src={logoService}
                                alt="Choisissez votre service"
                            />
                            <h2>Service</h2>
                        </label>

                        <select
                            id="service"
                            onChange={(e) => setService(e.target.value)}
                            required>
                            {serviceList.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
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
                                !validEmail ||
                                !validPassword ||
                                !validMatch ||
                                !validFirstName ||
                                !validLastName ||
                                !service
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
