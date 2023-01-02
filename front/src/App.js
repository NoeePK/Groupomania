import React from "react";
import { Routes, Route } from "react-router-dom";

// Composants permanents
import Header from "./components/Header";
import Footer from "./components/Footer";

// Différentes pages
import Home from "./pages/Home";
import Error from "./pages/Error";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/PageOne" element={<PageOne />} />
        <Route path="/Stuff/:id" element={<Stuff />} /> */}
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
