import React from "react";
import { Link } from "react-router-dom";

import { fetchData } from "../Data";

const data = await fetchData(publications);

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
