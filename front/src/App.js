import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import Publication from "./pages/Publication";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

// AJouter une page à propos avec règles de bienséance et l'explication du brief sur la raison de l'existence du site ?

const App = () => {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Publication/:id" element={<Publication />} />
                <Route path="/Publish" element={<Publish />} />
                <Route path="Profile/:id" element={<Profile />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
