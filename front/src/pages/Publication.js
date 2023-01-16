import React from "react";
import PublicationDetails from "../components/PublicationDetails";
import PublicationsBrowser from "../components/browsers/PublicationsBrowser";

// SI admin ou si publication t'appartient, Afficher le bouton modifier
const Publication = () => {
    return (
        <main>
            <h1>Publication</h1>
            <div className="publications-container">
                <PublicationDetails />
                <PublicationsBrowser />
            </div>
        </main>
    );
};

export default Publication;
