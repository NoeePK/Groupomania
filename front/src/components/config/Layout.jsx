import { Outlet } from "react-router-dom";
import Header from "../semantics/Header";
import Footer from "../semantics/Footer";

const Layout = () => {
    return (
        <main className="App">
            <Header/>
            <Outlet />
            <Footer />
        </main>
    );
};

export default Layout;
