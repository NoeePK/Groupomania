import React from "react";
import AboutContent from "../api/about.json";

const About = () => {
    return (
        <section className="about-container">
            <h1>A propos</h1>
            {AboutContent.map((item) => (
                <div className="about-card" key={item.title}>
                    <h2>{item.title}</h2>
                    <p>{item.text}</p>
                </div>
            ))}
        </section>
    );
};

export default About;
