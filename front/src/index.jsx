import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
// import { AuthProvider } from "./context/AuthProvider";

// Style applicable à toute l'application
import "./styles/compiled/index.css";
// Ajouter les mediaqueries ici

const root_container = document.getElementById("root");
const root = createRoot(root_container);

root.render(
    <BrowserRouter>
        
            <Routes>
                <Route path="/*" element={<App />} />
            </Routes>
       
    </BrowserRouter>
);
