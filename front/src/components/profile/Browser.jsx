// Récupérer les profils des autres collègues
// Peut-être un carrousel avec un bouton "découvrir d'autres collègues"

import React from "react";
import { Link, useParams } from "react-router-dom";

// import { fetchProfiles } from "../../Data";
// const data = fetchProfiles();

const Browser = () => {
    // const params = useParams();
    // const profiles = data.find((collegues) => collegues.id !== params.id);
    return (
        <>
            {/* {profiles.map((profile) => (
                <Link
                    className="to-collegue-link"
                    to={`/Profile/${profile.id}`}
                    key={profile.id}>
                    <img
                        src={profile.imageURL}
                        className="profile-avatar"
                        alt=""></img>
                    <h2>{profile.name}</h2>
                </Link>
            ))} */}
        </>
    );
};

export default Browser;
