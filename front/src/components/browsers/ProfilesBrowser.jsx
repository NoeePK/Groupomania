import React from "react";
import { Link } from "react-router-dom";
import getDatas from "../../api/getDatas";
const PROFILES_URL = "/profiles";

const ProfilesBrowser = () => {
    const profiles = getDatas(PROFILES_URL);

    return (
        <div className="profiles-browser">
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
        </div>
    );
};

export default ProfilesBrowser;
