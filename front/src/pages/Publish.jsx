import React, { useState } from "react";
import axios from "axios";

// Modifier et supprimer ses posts pour le proprio
// Supprimer un post pour l'admin
// Modération des commentaires?

const Publish = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preDefault();

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
        <main className="main-container">
            <h1>Publier sur le mur</h1>
            <form className="publish-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="title">
                    Titre
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required></input>
                </label>
                <label htmlFor="message">
                    Message
                    <textarea
                        name="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows="5"
                        required></textarea>
                </label>
                <label htmlFor="imageURL" className="add-image">
                    Ajouter une image
                    <input type="text" name="imageURL"></input>
                </label>
                <button type="submit" value="Submit">
                    Publier
                </button>
            </form>
        </main>
    );
};

export default Publish;
