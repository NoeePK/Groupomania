// Modifier et supprimer ses posts
// Système de like

import React, { useState } from "react";
import axios from "axios";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: title,
            message: message,
        };

        axios({
            url: `http://localhost:8080/api/publications`,
            method: "POST",
            data: payload,
        })
            .then(() => {
                console.log("Datas envoyées au serveur");
                // resetUserInputs();
            })
            .catch(() => {
                console.log("Accès non-autorisé");
            });
    };

    return (
        <>
            <h1>Publier sur le mur</h1>
            <form className="publish-form" onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Titre
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required></input>
                </label>
                <label>
                    Message
                    <textarea
                        name="message"
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        rows="5"
                        required></textarea>
                </label>
                <label className="add-image">
                    Ajouter une image
                    <input type="text" name="imageURL"></input>
                </label>
                <button type="submit" value="Submit">
                    Publier
                </button>
            </form>
        </>
    );
};

export default Publish;
