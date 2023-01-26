import React from "react";
import PublicationsBrowser from "../components/browsers/PublicationsBrowser";
import ProfilesBrowser from "../components/browsers/ProfilesBrowser";

// Lister les posts du + récent au + ancien

const Home = () => {
    return (
        <main className="main-container">
            <h1>Les dernières publications</h1>
            <div className="publications-browser">
                <PublicationsBrowser />
            </div>
            <div className="profiles-browser">
                <ProfilesBrowser />
            </div>
        </main>
    );
};

export default Home;
