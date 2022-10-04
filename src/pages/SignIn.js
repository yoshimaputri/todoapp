import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
    const [user, setUser] = useState(null);
    let navigate = useNavigate();
    let userList = JSON.parse(localStorage.getItem("userList"));
    if (!userList) {
        userList = [];
    }

    const handle_login = () => {
        let userData = userList.find((item) => item.username === user.username);
        if (userData) {
            if (userData.password === user.password) {
                localStorage.setItem("user", JSON.stringify(userData));
                setUser(userData);
            } else {
                alert("Wrong password");
            }
        } else {
            alert("User not found");
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [user]);

    return (
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
    );
}

export default SignIn;