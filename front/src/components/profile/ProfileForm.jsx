const ProfileForm = () => {
    return (
        <>
            <h1>Modifier mon profil</h1>
            <form className="profile-form">
                <label>
                    Modifier mon avatar
                    <input type="text" name="imageURL"></input>
                </label>
                <label>
                    Prénom
                    <input type="text" name="firstName"></input>
                </label>
                <label>
                    Nom de famille
                    <input type="text" name="lastName" required></input>
                </label>
                <label>
                    Date de naissance
                    <input type="date"></input>
                </label>
                <label>
                    Service
                    <input type="text" name="service" required></input>
                </label>
                <label>
                    Présentation
                    <textarea name="description" rows="5"></textarea>
                </label>
                <label>
                    Courriel
                    <input type="email" name="email"></input>
                </label>

                <Button
                    text="Enregistrer les modifications"
                    type="submit"
                    value="Submit"
                />
            </form>
        </>
    );
};

export default ProfileForm;
