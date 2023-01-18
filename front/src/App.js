import React from "react";
import RequireAuth from "./components/config/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Layout from ".//components/config/Layout";
import Login from "./pages/Connection/Login";
import Register from "./pages/Connection/Register";
import Home from "./pages/Home";
import Publication from "./pages/Publication";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Error from "./pages/Errors/NotFound";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Routes publiques */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Routes privées */}
                {/* Accès User */}

                <Route element={<RequireAuth allowedRoles={[2001]} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/publication/:id" element={<Publication />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="/About" element={<About />} />
                </Route>

                {/* Accès Admin */}
                {/* Ajouter les pages de suppression etc */}
                <Route element={<RequireAuth allowedRoles={[5150]} />}></Route>

                {/* Autres */}
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    );
};

export default App;
