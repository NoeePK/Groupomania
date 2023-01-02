// Lister les posts
// Récent au + ancien

import React from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const Home = () => {
    return (
        <section className="main-container">
            <h1>Les dernières publications</h1>
            <div className="cards-container">
                <Card />
                <Button text="Anciennes publications" />
            </div>

        </section>
    );
};

export default Home;
