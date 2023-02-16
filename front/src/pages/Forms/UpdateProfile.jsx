import React, { useState } from "react";
import axios from "axios";
import serviceList from "../../api/service_list.json"

const UpdateProfile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [bday, setBday] = useState("");
    const [service, setService] = useState("");
    const [bio, setBio] = useState("");

    const handleSubmit = (e) => {
        e.preDefault();

        const payload = {
            firstName: firstName,
            lastName: lastName,
            bday: bday,
            service: service,
            bio: bio,
        };

        axios({
            url: `http://localhost:3500/api/profile`,
            method: "POST",
            data: payload,
        })
            .then(() => {
                console.log("Datas envoyées au serveur");
                // resetUserInputs();
            })
            .catch(() => {
                console.log("Erreur axios");
            });
    };

    return (
        <main className="main-container">
            <h1>Modifier mon profil</h1>
            <form className="profile-form" onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor="imageURL">
                    <h2>Modifier mon avatar</h2>
                    <input type="text" id="imageURL" name="imageURL" />
                </label>
                <label htmlFor="firstName">
                    <h2>Prénom</h2>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Prénom"
                        required
                    />
                </label>
                <label htmlFor="lastName">
                    <h2>Nom de famille</h2>

                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Nom de famille"
                        required
                    />
                </label>
                <label htmlFor="birthday">
                    <h2>Date de naissance</h2>

                    <input
                        type="date"
                        id="birthday"
                        name="birthday"
                        value={bday}
                        onChange={(e) => setBday(e.target.value)}
                    />
                </label>
                <label htmlFor="service">
                    <h2>Service</h2>
                    <select
                        id="service"
                        onChange={(e) => setService(e.target.value)}
                        required>
                        {serviceList.map((item) => (
                            <option value={item.id} key={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label htmlFor="presentation">
                    <h2>Présentation</h2>

                    <textarea
                        name="presentation"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows="5"></textarea>
                </label>
                <button type="submit" value="Submit">
                    Enregistrer
                </button>
            </form>
        </main>
    );
};

export default UpdateProfile;
