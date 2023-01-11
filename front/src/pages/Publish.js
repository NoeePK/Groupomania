// Modifier et supprimer ses posts
// Système de like

import React, { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import postData from "../Data";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title: title,
            message: message,
        };

        postData("publication", payload);
    };

    return (
        <>
            <Header />
            <section className="publish-container">
                <h1>Publier sur le mur</h1>
                <form
                    className="publish-form"
                    onSubmit={(e) => handleSubmit(e)}>
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
                    <label>
                        Ajouter une image
                        <input type="text" name="imageURL"></input>
                    </label>
                    <Button text="Publier" type="submit" value="Submit" />
                </form>
            </section>
        </>
    );
};

export default Publish;
