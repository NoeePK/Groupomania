// Modifier et supprimer ses posts
// Système de like

const Publish = () => {
    return (
        <>
            <Header />
            <section className="publish-container">
                <h1>Publier sur le mur</h1>

                <form className="publish-form">
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
                        <input type="text" name="message" required></input>
                    </label>
                    <label>
                        Ajouter une image
                        <input type="text" name="imageURL"></input>
                    </label>
                    <label>
                        Date de publication
                        <input type="date" name="date" required></input>
                    </label>
                    <Button text="Publier" type="submit" value="Submit" />
                </form>
            </section>
        </>
    );
};

export default Publish;
