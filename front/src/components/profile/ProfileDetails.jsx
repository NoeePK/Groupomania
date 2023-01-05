import React from "react";
import { useParams } from "react-router-dom";

const ProfileDetails = () => {
    const params = useParams();
    const profile = profile.find((pr) => pr.id === params.id);
    // SI : current user id === post id, ALORS afficher les boutons modifier et supprimer
    return (
        <>
            <h1>Profil de {profile.name}</h1>
            <div className="profile-details">
                <img src="" alt=""></img>
                <ul>
                    <li>Date de naissance : {profile.birthday}</li>
                    <li>Service : {profile.service}</li>
                    <li>Présentation : {profile.description}</li>
                    <li>Courriel : {profile.email}</li>
                </ul>
            </div>
        </>
    );
};

export default ProfileDetails;
