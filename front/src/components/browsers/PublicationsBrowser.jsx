import React from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../../api/handleData";
const PUBLICATIONS_URL = "/publications";

const PublicationsBrowser = () => {
    const data = fetchData(PUBLICATIONS_URL);

    return (
        <div className="publications-browser">
            {data.map((publication) => (
                <Link
                    className="to-publication-link"
                    to={`/Publication/${publication.id}`}
                    key={publication.id}>
                    <h2>{publication.title}</h2>
                </Link>
            ))}
        </div>
    );
};

export default PublicationsBrowser;
