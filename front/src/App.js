import React from "react";
import RequireAuth from "./components/config/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Layout from ".//components/config/Layout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";

import Home from "./pages/Home";
import Publication from "./pages/Publication";
import Publish from "./pages/Publish";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";

const defaultUser = process.env.USER;
const Admin = process.env.ADMIN;

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Routes publiques */}
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="about" element={<About />} />

                {/* Accès User */}
                <Route element={<RequireAuth allowedRoles={defaultUser} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="publication/:id" element={<Publication />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="publish" element={<Publish />} />
                    <Route path="updateProfile" element={<UpdateProfile />} />
                    <Route path="unauthorized" element={<Unauthorized />} />
                </Route>

                {/* Accès Admin */}
                <Route element={<RequireAuth allowedRoles={Admin} />}></Route>

                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
