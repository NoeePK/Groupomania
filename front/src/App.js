import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Connection from "./pages/Connection";
import Home from "./pages/Home";
import AddPost from "./pages/AddPost";
import Error from "./pages/Error";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path="/" element={<Connection />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/AddPost" element={<AddPost />} />
                <Route path="*" element={<Error />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
