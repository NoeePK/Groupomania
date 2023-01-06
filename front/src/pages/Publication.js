import React from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../components/Header";
import Button from "../components/Button";
import LikingSystem from "../components/LinkingSystem";
import Comments from "../components/Comments";
import Error from "./Error";

const Publication = () => {
    const params = useParams();
    const post = post.find((po) => po.id === params.id);
    const profile = profile.find((pr) => pr.id === params.id);

    // SI : current user id === post id, ALORS afficher les boutons modifier et supprimer

    if (!post) return <Error />;

    return (
        <>
            <Header />
            <main key={post.id}>
                <section className="post">
                    <h1>{post.title}</h1>
                    <img src={post.imageURL} alt=""></img>
                    <p>{post.message}</p>
                </section>
                <section className="author" key={profile.id}>
                    <p>
                        Publié le {post.date} par {profile.name} du service{" "}
                        {profile.service}.
                    </p>
                    <Link
                        className="to-profile-link"
                        to={`/Profile/${profile.id}`}>
                        Découvrir le profil
                    </Link>
                </section>
                {/* <section hidden={poster ? false : true}>
                    <Button text="Modifier" onClick="handleModify()" />
                    <Button text="Supprimer" onClick="handleDelete()" />
                </section> */}
                <section className="linkingSystem">
                    <LikingSystem
                        likes={post.likes}
                        dislikes={post.dislikes}
                        usersLiked={post.usersLiked}
                        usersDisliked={post.usersDisliked}
                    />
                </section>
                <section className="comments">
                    <Comments
                        comments={post.comments}
                        author={post.commentsAuthor}
                    />
                </section>
            </main>
        </>
    );
};

export default Publication;