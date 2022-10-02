import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

const SignUp = () => {
    const [load, setLoad] = useState(false);
    const userData = {
        id: "", //numberiter
        username: "",
        password: "",
    }
    const [user, setUser] = useState(null);

    const handle_signup = () => {
        localStorage.getItem("idCount") ? localStorage.setItem("idCount", Number(localStorage.getItem("idCount")) + 1) : localStorage.setItem("idCount", 1);
        setUser((r) => ({ ...r, id: localStorage.getItem("idCount") }));

        localStorage.setItem("user", JSON.stringify(userData)); // append list of accounts
    };

    useEffect(() => {
        window.localStorage.getItem("user") && setLoad(true);
    }, [user]);

    return load ? (
        <>
            <div className="sign-in" >
                <div className="login-container">
                    <div className="login">
                        <div className="title-signin">Account Registration</div>
                        <form>
                            <div className="form-group">
                                <input
                                    className="sign-in-form"
                                    type="text"
                                    name="userid"
                                    placeholder="Enter a username"
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
                                    placeholder="Enter a password"
                                    autoComplete="current-password"
                                    onChange={(text) =>
                                        setUser((r) => ({ ...r, password: text.target.value }))
                                    }
                                />
                            </div>

                            <button
                                onClick={() => handle_signup()}
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    ) : null;
}

export default SignUp;