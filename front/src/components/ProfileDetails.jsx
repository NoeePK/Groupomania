import React from "react";
import { Link, useParams } from "react-router-dom";
import getDatas from "../api/datas";
import ProfileForm from "../components/forms/ProfileForm";
import PublicationsBrowser from "../components/browsers/PublicationsBrowser";
import NotFound from "../pages/Errors/NotFound";
const PROFILE_URL = "/profiles";

const ProfileDetails = () => {
    const params = useParams();
    const profiles = getDatas(PROFILE_URL);
    const profile = profiles.find((p) => p.id === params.id);

    // SI : current user id === post id, ALORS afficher les boutons modifier et supprimer

    if (!profile) return <NotFound />;

    return (
        <section className="profile-container" key={profile.id}>
            <h1>Profil de {profile.name}</h1>
            <button>
                <Link to={<ProfileForm />}>Modifier ce profil"</Link>
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
                <PublicationsBrowser />
            </div>
        </section>
    );
};

export default ProfileDetails;
