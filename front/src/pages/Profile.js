import React, { useState } from "react";
import Header from "../components/semantics/Header";
import Button from "../components/Button";
import ProfileDetails from "../components/ProfileDetails";
import ProfileForm from "../components/forms/ProfileForm";
import Profiles from "../components/browsers/ProfileBrowser";

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
                    <ProfileDetails />
                    <article className="profiles-browser">
                        <Profiles />
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
