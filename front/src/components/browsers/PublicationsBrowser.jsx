import React from "react";
import { Link } from "react-router-dom";
import {fetchDatas} from "../../api/handleData";
import { API_ROUTES } from "../../api/api_routes";
const PUBLICATIONS_URL = API_ROUTES.getAllProfiles;

const PublicationsBrowser = () => {
    const data = fetchDatas(PUBLICATIONS_URL);

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
