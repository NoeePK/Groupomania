import React from "react";
import { Link, useParams } from "react-router-dom";
// const currentUser = req.auth.userId;
// Récupérer id de l'user et envoyer sur cette page

// const userId = req.body.ETag;

// const fetchProfile = async() => {
//     try {
//         const response = await fetch(`http://localhost:8080/api/profiles/${userId}`)

//     } catch(err) {
//         console.log("erreur de récupération d'id")
//     }
// }

const Navigation = () => {
    // const params = useParams();
    // const profile = profile.find((pr) => pr.id === params.id);

    return (
        <nav>
            <Link to="/Home">Accueil</Link>
            {/* <Link to={`/Profile/${profile}`}>Profil</Link> */}
            <div>Se déconnecter</div>
        </nav>
    );
};

export default Navigation;
