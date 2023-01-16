// Peut-être un carrousel avec un bouton "découvrir d'autres collègues"

import React from "react";
import { Link } from "react-router-dom";
import getDatas from "../../api/datas";
const PROFILES_URL = "/profiles";

const Browser = () => {
    const profiles = getDatas(PROFILES_URL);

    return (
        <>
            {profiles.map((profile) => (
                <Link
                    className="to-collegue-link"
                    key={profile.id}
                    to={`/Profile/${profile.id}`}>
                    <img
                        src={profile.imageUrl}
                        className="profile-avatar"
                        alt=""
                    />
                    <h2>{profile.name}</h2>
                </Link>
            ))}
        </>
    );
};

export default Browser;
