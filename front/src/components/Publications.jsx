import React from "react";
import { Link } from "react-router-dom";
import API from "../API";
const data = API.stringify();

const Publications = () => {
    return (
        <>
            {data.map((publication) => (
                <Link
                    className="to-publication-link"
                    to={`/Publication/${publication.id}`}
                    key={publication.id}>
                        <h2>{publication.title}</h2>
                    </Link>
            ))}
        </>
    );
};

export default Publications;
