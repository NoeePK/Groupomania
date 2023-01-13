import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/semantics/Footer";
import axios from "axios";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Publication from "./pages/Publication";
import Profile from "./pages/Profile";
import Error from "./pages/Error";
// Ajouter une page About avec règles de bienséance et l'explication du brief sur la raison de l'existence du site
// import About from "./pages/About";

const App = () => {
    axios.defaults.headers.common.Authorization = `Bearer ${localStorage.token}`;
    // SI utilisateur a un token de connexion,
    // ALORS il a accès à la page qu'il demande (ou la page d'accueil s'il était sur login ou register)
    const userIsLogged = (props) => {
        let userIsLogged = localStorage.token !== null;
        return userIsLogged ? props.destination : <Navigate to="/login" />;
    };
    const userIsNotLogged = (props) => {
        let userIsLogged = localStorage.token !== null;
        return userIsLogged ? <Navigate to="/" /> : props.destination;
    };

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/login"
                    element={userIsNotLogged({ destination: <Login /> })}
                />
                <Route
                    path="/register"
                    element={userIsNotLogged({ destination: <Register /> })}
                />
                <Route
                    path="/"
                    element={userIsLogged({ destination: <Home /> })}
                />
                <Route
                    path="/publication/:id"
                    element={userIsLogged({ destination: <Publication /> })}
                />
                <Route
                    path="profile/:id"
                    element={userIsLogged({ destination: <Profile /> })}
                />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
