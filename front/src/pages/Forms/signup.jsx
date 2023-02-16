import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { REGEX } from "../../components/config/regex";
import { API_ROUTES } from "../../api/api_routes";
import serviceList from "../../api/service_list.json";
import axios from "../../api/axios";

import logoName from "../../assets/id-logo.svg";
import logoService from "../../assets/logo-service.svg";
import warning from "../../assets/warning.svg";

const Signup = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const nameRef = useRef();
    const errRef = useRef();

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
        nameRef.current.focus();
    }, []);

    // Valider les inputs
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
    }, [firstName, lastName]);

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
                            ref={nameRef}
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

                        <button
                            onClick={handleSubmit}
                            disabled={
                                !validFirstName || !validLastName || !service
                                    ? true
                                    : false
                            }>
                            S'inscrire
                        </button>
                    </form>
                </section>
            </section>
        </main>
    );
};

export default Signup;
