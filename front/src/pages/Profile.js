import Header from "../components/Header";
import Profile from "../components/Profile";
import Browser from "../components/profile/Browser";
import Button from "../components/Button";

const Profile = () => {
    return (
        <>
            <Header />
            <section className="profile-container">
                <article className="profile">
                    <Profile />
                    <Button
                        text="Modifier votre profil"
                        type="link"
                        value="true"
                    />
                    <></>
                </article>
                <article className="profiles-browser">
                    <Browser />
                </article>
            </section>
            <section></section>
        </>
    );
};

export default Profile;
