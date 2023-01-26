import React from "react";
import AboutContent from "../api/about.json";
import Collapse from "../components/Collapse";

const About = () => {
    return (
        <section className="about-container">
            <h1>A propos</h1>
            {AboutContent.map((item) => (
                <Collapse
                    className="about-collapse"
                    key={item.title}
                    title={item.title}
                    text={item.text}
                />
            ))}
        </section>
    );
};

export default About;
