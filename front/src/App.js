import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import Error from "./pages/Error";
import SignInUp from "./pages/SignInUp";
import Identification from "./pages/Identification";

// AJouter une page à propos avec règles de bienséance et l'explication du brief sur la raison de l'existence du site ?

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Identification />} />
                <Route path="/SignInUp" element={<SignInUp />}></Route>

                <Route path="/Home" element={<Home />} />
                <Route path="/Publish" element={<Publish />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
