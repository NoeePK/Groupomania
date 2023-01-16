import React from "react";
import { Link, useParams } from "react-router-dom";
import getDatas from "../api/datas";
import Error from "../pages/Error";
import PublishForm from "../components/forms/PublishForm";
import LikingSystem from "./LinkingSystem";
import Comments from "./Comments";
const PUBLICATION_URL = "/publications";

const PublicationDetails = () => {
    const params = useParams();
    const publications = getDatas(PUBLICATION_URL);
    const publication = publications.find((p) => p.id === params.id);
    const profile = publication.id;
    // const profile = profile.find((pr) => pr.id === params.id);
    // user._id === profile

    // SI : current user id === profile id, ALORS afficher les boutons modifier et supprimer
{/* <section hidden={publicationer ? false : true}>
                    <Button text="Modifier" onClick="handleModify()" />
                    <Button text="Supprimer" onClick="handleDelete()" />
                </section> */}
    if (!publication) return <Error />;

    return (
        <section className="publication-container" key={publication.id}>
            <h1>{publication.title}</h1>
            <button>
                <Link to={<PublishForm />}>Modifier cette publication"</Link>
            </button>
            <div className="publication">
                <img src={publication.imageURL} alt=""></img>
                <p>{publication.message}</p>
            </div>
            <div className="author" key={profile.id}>
                <p>
                    Publié le {publication.date} par {profile.name} du service
                    {profile.service}.
                </p>
                <Link className="to-profile-link" to={`/Profile/${profile.id}`}>
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
    );
};

export default PublicationDetails;