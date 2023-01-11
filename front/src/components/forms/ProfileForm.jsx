import React, { useState } from "react";
import Button from "../Button";

const ProfileForm = () => {
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <h1>Modifier mon profil</h1>
            <form className="profile-form" onSubmit={handleSubmit}>
                <label>
                    Modifier mon avatar
                    <input type="text" id="imageURL" name="imageURL" />
                </label>
                <label>
                    Prénom
                    <input type="text" id="firstName" name="firstName" />
                </label>
                <label>
                    Nom de famille
                    <input type="text" id="lastName" name="lastName" required />
                </label>
                <label>
                    Date de naissance
                    <input type="date" id="birthday" name="birthday" />
                </label>
                <label>
                    Service
                    <input type="text" id="service" name="service" required />
                </label>
                <label>
                    Présentation
                    <textarea name="description" rows="5"></textarea>
                </label>
                <label>
                    Courriel
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@gmail.com"
                    />
                    <span className="errorMessage"></span>
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
