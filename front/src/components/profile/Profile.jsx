import React, { useState } from "react";

import ProfileForm from "./ProfileForm";
import Button from "./Button";

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
