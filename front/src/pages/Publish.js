// Modifier et supprimer ses posts
// Système de like

import Button from "../components/Button";
import Header from "../components/Header";

const Publish = () => {
    return (
        <>
            <Header />
            <section className="publish-container">
                <h1>Publier sur le mur</h1>

                <form className="publish-form">
                    <label>
                        Titre
                        <input type="text" name="title" required></input>
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
                        Service
                        <input type="text" name="service" required></input>
                    </label>
                    <label>
                        Message
                        <textarea name="message" rows="5" required></textarea>
                    </label>
                    <label>
                        Ajouter une image
                        <input type="text" name="imageURL"></input>
                    </label>
                    <Button text="Publier" type="submit" value="Submit" />
                </form>
            </section>
        </>
    );
};

export default Publish;
