import React, { useState } from "react";
import PublicationsBrowser from "../components/browsers/PublicationsBrowser";
import ProfileBrowser from "../components/browsers/ProfileBrowser";
import PublishForm from "../components/forms/PublishForm";
import Header from "../components/semantics/Header";

// Lister les posts du + récent au + ancien

const Home = () => {
    const [editorIsClosed, setToggle] = useState(false);
    const editorIsOpen = () => {
        setToggle(!editorIsClosed);
    };

    return (
        <>
            <Header />
            <section className="main-container">
                <h1>Les dernières publications</h1>
                <div className="publications-container">
                    <PublicationsBrowser />
                    <button>Anciennes publications</button>
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
                <aside className="sidebar">
                    <ProfileBrowser />
                </aside>
            </section>
        </>
    );
};

export default Home;
