// Lister les posts
// Récent au + ancien

import React from "react";
import Publications from "../components/Publications";
import Button from "../components/Button";
import Header from "../components/Header";

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
            </section>
        </>
    );
};

export default Home;
