// components/Layout.js
import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "./css/Navbar.module.css"

const Layout = () => {
    const location = useLocation();

    return (
        <>
            <nav>
                {location.pathname !== "/" && (
                    <Link to="/">Avaleht</Link>
                )}
                <Link to="/asutamine">Asutamine</Link>
            </nav>
            <Outlet /> {/* Child routes get rendered here */}
        </>
    );
};

export default Layout;
