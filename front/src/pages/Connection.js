//Créer un compte
// Se connecter
// Se déconnecter
// Mail et mdp
// Sécurité mail et mdp comme p6

// Session s'arrête quand user se déconnecter
const Connection = () => {
    return (
        <section className="main-container">
            <img src={image} alt="Logo de Groupomania"></img>

            <div className="connection-container">
                <form className="connection">
                    <label>
                        Courriel
                        <input type="email" name="email" required />
                    </label>
                    <label>
                        Mot de passe
                        <input type="password" name="passeword" required />
                    </label>
                    <input type="submit" value="Submit">
                        <Button text="Se connecter" />
                    </input>
                </form>
            </div>
        </section>
    );
};

export default Connection;
