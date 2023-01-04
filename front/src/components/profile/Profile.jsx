import React, { useState } from "react";
import Button from "./Button";
import Browser from "../components/profile/Browser";
import ProfileForm from "./ProfileForm";

const Profile = () => {
    const [editorIsClosed, setToggle] = useState(false);
    const editorIsOpen = () => {
        setToggle(!editorIsClosed);
    };

    return (
        <>
            <Button onClick={editorIsOpen} />
            <div
                className="profile-editor-closed"
                hidden={editorIsClosed ? false : true}>
                <ProfileDetails />
                <article className="profiles-browser">
                    <Browser />
                </article>
            </div>

            <div
                className="profile-editor-open"
                hidden={editorIsClosed ? true : false}>
                <ProfileForm />
            </div>
        </>
    );
};

export default Profile;
