import React, { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import ProfileDetails from "../components/profile/ProfileDetails";
import ProfileForm from "../components/profile/ProfileForm";
import Browser from "../components/profile/Browser";

const Profile = () => {
    const [editorIsClosed, setToggle] = useState(false);
    const editorIsOpen = () => {
        setToggle(!editorIsClosed);
    };
    return (
        <>
            <Header />
            <section className="profiles-container">
                <Button title="Modifier mon profil" onClick={editorIsOpen} />

                <div
                    className="profile-editor-closed"
                    hidden={editorIsClosed ? false : true}>
                    <ProfileDetails  />
                    <article className="profiles-browser">
                        <Browser />
                    </article>
                </div>

                <div
                    className="profile-editor-open"
                    hidden={editorIsClosed ? true : false}>
                    <ProfileForm />
                </div>
            </section>
        </>
    );
};

export default Profile;
