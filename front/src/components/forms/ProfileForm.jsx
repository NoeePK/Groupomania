import axios from "axios";
import React, { useState } from "react";

const ProfileForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bday, setBday] = useState("");
    const [service, setService] = useState("");
    const [bio, setBio] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            firstName: firstName,
            lastName: lastName,
            bday: bday,
            service: service,
            bio: bio,
        };

        axios({
            url: `http://localhost:8080/api/profile`,
            method: "POST",
            data: payload,
        })
            .then(() => {
                console.log("Datas envoyées au serveur");
                // resetUserInputs();
            })
            .catch(() => {
                console.log("Erreur serveur");
            });
    };

    console.log(firstName);
    console.log(lastName);
    console.log(bday);
    console.log(service);
    console.log(bio);

    return (
        <>
            <h1>Modifier mon profil</h1>
            <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
                <label>
                    Modifier mon avatar
                    <input type="text" id="imageURL" name="imageURL" />
                </label>
                <label>
                    Prénom
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Nom de famille
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Date de naissance
                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={bday}
                        onChange={(event) => setBday(event.target.value)}
                    />
                </label>
                <label>
                    Service
                    <input
                        type="text"
                        id="service"
                        name="service"
                        value={service}
                        onChange={(event) => setService(event.target.value)}
                        required
                    />
                </label>
                <label>
                    Présentation
                    <textarea
                        name="presentation"
                        value={bio}
                        onChange={(event) => setBio(event.target.value)}
                        rows="5"></textarea>
                </label>
                <button type="submit" value="Submit">
                    Enregistrer
                </button>
            </form>
        </>
    );
};

export default ProfileForm;
