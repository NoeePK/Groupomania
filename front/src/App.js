import React from "react";
import RequireAuth from "./components/config/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Layout from ".//components/config/Layout";

import Login from "./pages/Connection/Login";
import Register from "./pages/Connection/Register";
import About from "./pages/About";
import NotFound from "./pages/Errors/NotFound";
import Unauthorized from "./pages/Errors/Unauthorized";

import Home from "./pages/Home";
import Publication from "./pages/Publication";
import Publish from "./pages/Forms/Publish";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/Forms/UpdateProfile";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/* Routes publiques */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/About" element={<About />} />
                
             
                {/* Routes privées */}
                {/* Accès User */}
                <Route element={<RequireAuth allowedRoles={2001}/>}>
                    <Route path="/" element={<Home />} />
                    <Route path="/publication/:id" element={<Publication />} />
                    <Route path="profile/:id" element={<Profile />} />
                    <Route path="publish" element={<Publish />} />
                    <Route path="updateProfile" element={<UpdateProfile />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/unauthorized" element={<Unauthorized />} />
                </Route>

                {/* Accès Admin */}
                <Route element={<RequireAuth allowedRoles={[5150]} />}></Route>
            </Route>
        </Routes>
    );
};

export default App;
