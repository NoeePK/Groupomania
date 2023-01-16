import React from "react";
import RequireAuth from "./components/config/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Layout from ".//components/config/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Publication from "./pages/Publication";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
// Ajouter une page About avec règles de bienséance et l'explication du brief sur la raison de l'existence du site
// import About from "./pages/About";

const App = () => {
    // axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
    // // SI utilisateur a un token de connexion,
    // // ALORS il a accès à la page qu'il demande (ou la page d'accueil s'il était sur login ou register)
    // const userIsLogged = (props) => {
    //     let userIsLogged = localStorage.token !== null;
    //     return userIsLogged ? props.destination : <Navigate to="/login" />;
    // };
    // const userIsNotLogged = (props) => {
    //     let userIsLogged = localStorage.token !== null;
    //     return userIsLogged ? <Navigate to="/" /> : props.destination;
    // };

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Routes publiques */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Routes privées */}
                {/* Autorisé pour un utilisateur lambda */}
                <Route element={<RequireAuth allowedRoles={[2001]} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/publication/:id" element={<Publication />} />
                    <Route path="profile/:id" element={<Profile />} />
                </Route>

                {/* Autorisé pour un admin */}
                {/* Ajouter les pages de suppression etc */}
                {/* <Route
                    element={
                        <RequireAuth allowedRoles={[5150]} />
                    }></Route> */}

                {/* Autres */}
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default App;
