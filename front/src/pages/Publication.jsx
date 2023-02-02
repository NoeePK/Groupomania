import React from "react";
import { Link, useParams } from "react-router-dom";
import { API_ROUTES } from "../api/api_routes";
import getDatas from "../api/getDatas";
import NotFound from "./Errors/NotFound";
import LikingSystem from "../components/LinkingSystem";
import Comments from "../components/Comments";

import PublicationsBrowser from "../components/browsers/PublicationsBrowser";

// SI admin ou si publication t'appartient, Afficher le bouton modifier
const Publication = () => {
    const params = useParams();
    const publications = getDatas(API_ROUTES.getAllPublications);
    const publication = publications.find((p) => p.id === params.id);
    const profile = publication.id;
    // const profile = profile.find((pr) => pr.id === params.id);
    // user._id === profile

    // SI : current user id === profile id, ALORS afficher les boutons modifier et supprimer
    {
        /* <section hidden={publicationer ? false : true}>
                    <Button text="Modifier" onClick="handleModify()" />
                    <Button text="Supprimer" onClick="handleDelete()" />
                </section> */
    }
    if (!publication) return <NotFound />;

    return (
        <main>
            <h1>Publication</h1>
            <div className="publications-container">
                <section className="publication-container" key={publication.id}>
                    <h1>{publication.title}</h1>
                    {/* <button>
                <Link to={<Publish />}>Modifier cette publication"</Link>
            </button> */}
                    <div className="publication">
                        <img src={publication.imageURL} alt=""></img>
                        <p>{publication.message}</p>
                    </div>
                    <div className="author" key={profile.id}>
                        <p>
                            Publié le {publication.date} par {profile.name} du
                            service
                            {profile.service}.
                        </p>
                        <Link
                            className="to-profile-link"
                            to={`/Profile/${profile.id}`}>
                            Découvrir le profil
                        </Link>
                    </div>

                    <div className="linkingSystem">
                        <LikingSystem
                            likes={publication.likes}
                            dislikes={publication.dislikes}
                            usersLiked={publication.usersLiked}
                            usersDisliked={publication.usersDisliked}
                        />
                    </div>
                    <div className="comments">
                        <Comments
                            comments={publication.comments}
                            author={publication.commentsAuthor}
                        />
                    </div>
                </section>

                <PublicationsBrowser />
            </div>
        </main>
    );
};

export default Publication;
