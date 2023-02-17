import React from "react";
import { Link, useParams } from "react-router-dom";
import { API_ROUTES } from "../api/api_routes";
import { fetchData } from "../api/handleData";
import UpdateProfile from "./UpdateProfile";
import ProfilesBrowser from "../components/browsers/ProfilesBrowser";
import PublicationsBrowser from "../components/browsers/PublicationsBrowser";
import NotFound from "./NotFound";

// Peut-être un carrousel avec un bouton "découvrir d'autres collègues"
// SI admin ou si profile t'appartient, Afficher le bouton modifier
const Profile = () => {
    const params = useParams();
    const profiles = fetchData(API_ROUTES.getAllProfiles);
    const profile = profiles.find((p) => p.id === params.id);

    // SI : current user id === post id, ALORS afficher les boutons modifier et supprimer

    if (!profile) return <NotFound />;

    return (
        <main>
            <section className="profiles-container">
                <section className="profile-container" key={profile.id}>
                    <h1>Profil de {profile.name}</h1>
                    <button>
                        <Link to={<UpdateProfile />}>Modifier ce profil"</Link>
                    </button>
                    <div className="profile">
                        <img src={profile.imageUrl} alt=""></img>
                        <ul>
                            <li>Date de naissance : {profile.birthday}</li>
                            <li>Service : {profile.service}</li>
                            <li>Présentation : {profile.description}</li>
                            <li>Courriel : {profile.email}</li>
                        </ul>
                    </div>
                    <div className="publications-browser">
                        <h2>Publications de {profile.name}</h2>
                        {/* Passer des props ici pour cibler les posts de cet user */}
                        <PublicationsBrowser />
                    </div>
                </section>

                <ProfilesBrowser />
            </section>
        </main>
    );
};

export default Profile;
