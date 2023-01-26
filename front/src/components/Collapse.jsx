import React, { useState } from "react";
import arrow from "../assets/arrow.svg";

const Collapse = (props) => {
    const [toggleIsClosed, setToggle] = useState(false);
    const toggleIsOpen = () => {
        setToggle(!toggleIsClosed);
    };

    return (
        <>
            <div className="collapse">
                <div
                    className={
                        toggleIsClosed
                            ? "collapse-title collapse-open"
                            : "collapse-title collapse-closed"
                    }
                    onClick={toggleIsOpen}>
                    <h2>{props.title}</h2>
                    <img
                        className={toggleIsClosed ? "arrow_up" : "arrow_down"}
                        src={arrow}
                        alt={
                            toggleIsClosed
                                ? "Afficher les détails"
                                : "Cacher les détails"
                        }
                    />
                </div>
                <div className="collapse-text ">
                    <div
                        hidden={toggleIsClosed ? false : true}
                        className={
                            toggleIsClosed ? "text-open" : "text-closed"
                        }>
                        {props.text}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Collapse;
