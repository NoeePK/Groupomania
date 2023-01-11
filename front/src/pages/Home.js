// Lister les posts
// Récent au + ancien

import React from "react";
import Publications from "../components/browsers/PublicationsBrowser";
import Profiles from "../components/browsers/ProfileBrowser";
import Button from "../components/Button";
import Header from "../components/semantics/Header";

const Home = () => {
    return (
        <>
            <Header />
            <section className="main-container">
                <h1>Les dernières publications</h1>
                <div className="publications-container">
                    <Publications />
                    <Button text="Anciennes publications" />
                </div>
                <aside className="sidebar">
                    <Profiles/>
                </aside>
            </section>
        </>
    );
};

export default Home;
