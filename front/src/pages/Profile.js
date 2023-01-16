import React from "react";
import ProfileDetails from "../components/ProfileDetails";
import ProfilesBrowser from "../components/browsers/ProfilesBrowser";
// Peut-être un carrousel avec un bouton "découvrir d'autres collègues"
// SI admin ou si profile t'appartient, Afficher le bouton modifier
const Profile = () => {
    return (
        <main>
            <section className="profiles-container">
                <ProfileDetails />
                <ProfilesBrowser />
                
            </section>
        </main>
    );
};

export default Profile;
