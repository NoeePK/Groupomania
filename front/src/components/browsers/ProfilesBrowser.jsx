import React from "react";
import { Link } from "react-router-dom";
import {fetchDatas} from "../../api/handleData";
import { API_ROUTES } from "../../api/api_routes";
const PROFILES_URL = API_ROUTES.getAllProfiles;

const ProfilesBrowser = () => {
    const data = fetchDatas(PROFILES_URL);
    return (
        <div className="profiles-browser">
            {data.map((profile) => (
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
