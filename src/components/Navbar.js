import { useState } from "react";
import { Link } from "react-router-dom";
import { Btn } from "./Button";
import "./Navbar.css";

const Navbar = () => {
    const check = localStorage.getItem("user");
    const [user, setUser] = useState(
        check ? JSON.parse(localStorage.getItem("user")) : null
    );

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        Link("/sign-in");
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        Home
                    </Link>
                    {user ? (
                        <Btn linkto="/sign-in" className="nav-link">
                            Sign in
                        </Btn>
                    ) : (
                        <Btn onClick={() => handleLogout()} className="nav-link">
                            Sign out
                        </Btn>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;