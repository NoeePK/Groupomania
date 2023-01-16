import React, { useState } from "react";
import PublicationsBrowser from "../components/browsers/PublicationsBrowser";
import ProfilesBrowser from "../components/browsers/ProfilesBrowser";
import PublishForm from "../components/forms/PublishForm";

// Lister les posts du + récent au + ancien

const Home = () => {
    const [editorIsClosed, setToggle] = useState(false);
    const editorIsOpen = () => {
        setToggle(!editorIsClosed);
    };

    return (
        <>
            <section className="main-container">
                <h1>Les dernières publications</h1>
                <div className="publications-browser">
                    <PublicationsBrowser />
                </div>
                <div className="profiles-browser">
                    <ProfilesBrowser />
                </div>
                <div className="publish-container">
                    <button onClick={editorIsOpen}>Publier</button>
                    <div
                        className={
                            editorIsClosed ? "editor-closed" : "editor-open"
                        }
                        hidden={editorIsClosed ? false : true}>
                        <PublishForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
