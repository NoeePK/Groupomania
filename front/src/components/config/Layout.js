import { Outlet } from "react-router-dom";
import Footer from "./components/semantics/Footer";

const Layout = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    );
};

export default Layout;
