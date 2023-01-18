import React from "react";
import AboutContent from "../datas/about.json";
import Header from "../api/about.json";

const About = () => {
    return (
        <section className="about-container">
            <Header />
            {/* <div className="content-container">
                {AboutContent.map((array) => (
                    <Collapse
                        className="collapse-container"
                        title={array.title}
                        text={array.text}
                        key={array.title}
                    />
                ))}
            </div> */}
        </section>
    );
};

export default About;
