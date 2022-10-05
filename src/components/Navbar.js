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
        window.location.reload();
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        Home
                    </Link>
                    {user ? (
                        <Btn buttonStyle='btn-red' onClick={() => handleLogout()} className="nav-link">
                            SIGN OUT
                        </Btn>
                    ) : (
                        <Btn buttonStyle='btn-blue' linkto="/sign-in" className="nav-link">
                            SIGN IN
                        </Btn>

                    )}
                </div>
            </nav>
        </>
    );
}

export default Navbar;