import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SignIn.css";
import Btn from "../components";

const SignIn = () => {
    const [load, setLoad] = useState(false);
    const userData = {
        id: "", //numberiter
        username: "",
        password: "",
    }
    const [user, setUser] = useState(null);

    const handle_login = () => {
        localStorage.setItem("user", JSON.stringify(userData));
    };

    useEffect(() => {
        window.localStorage.getItem("user") && setLoad(true);
    }, [user]);

    return load ? (
        <>
            <div className="sign-in" >
                <div className="login-container">
                    <div className="login">
                        <div className="title-signin">Sign In</div>
                        <form>
                            <div className="form-group">
                                <input
                                    className="sign-in-form"
                                    type="text"
                                    name="userid"
                                    placeholder="Username"
                                    autoComplete="username"
                                    onChange={(text) =>
                                        setUser((r) => ({ ...r, username: text.target.value }))
                                    }
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="sign-in-form"
                                    type="password"
                                    name="userid"
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    onChange={(text) =>
                                        setUser((r) => ({ ...r, password: text.target.value }))
                                    }
                                />
                            </div>

                            <button
                                onClick={() => handle_login()}
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                    <div className="login-forgot">
                        <Link to="/sign-up">
                            <div style={{ color: 'white', paddingTop: '3%' }}>Create an account?</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    ) : null;
}

export default SignIn;