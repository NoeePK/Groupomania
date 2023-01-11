import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/semantics/Footer";
import axios from "axios";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Publication from "./pages/Publication";
import Profile from "./pages/Profile";
import Error from "./pages/Error";

// ?? Ajouter une page à propos avec règles de bienséance et l'explication du brief sur la raison de l'existence du site ?

const App = () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;

    const getPublications = () => {
        axios
            .get("/api")
            .then((response) => {
                const data = response.data;
                console.log("Data reçues");
            })
            .catch(() => {
                console.log("Les datas n'ont pas pu être récupérées");
            });
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Publication/:id" element={<Publication />} />
                <Route path="Profile/:id" element={<Profile />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
