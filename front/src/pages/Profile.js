import React, { useState } from "react";
import Header from "../components/semantics/Header";
import ProfileDetails from "../components/ProfileDetails";
import ProfileForm from "../components/forms/ProfileForm";
import ProfileBrowser from "../components/browsers/ProfileBrowser";

const Profile = () => {
    const [editorIsClosed, setToggle] = useState(false);
    const editorIsOpen = () => {
        setToggle(!editorIsClosed);
    };
    return (
        <>
            <Header />
            <section className="main-container">
                <h1>Profil</h1>
                <div className="profiles-container">
                    <button onClick={editorIsOpen}>Modifier mon profil"</button>

                    <div
                        className={
                            editorIsClosed ? "editor-closed" : "editor-open"
                        }
                        hidden={editorIsClosed ? false : true}>
                        <ProfileDetails />
                        <article className="profiles-browser">
                            <ProfileBrowser />
                        </article>
                    </div>

                    <div
                        className={
                            editorIsClosed ? "editor-open" : "editor-closed"
                        }
                        hidden={editorIsClosed ? true : false}>
                        <ProfileForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;
