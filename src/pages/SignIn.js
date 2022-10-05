import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
import "./Home.css";
import Btn from "../components/Button";

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

                            <Btn buttonStyle='btn-red'
                                onClick={() => handle_login()}
                            >
                                Sign In
                            </Btn>
                        </form>
                    </div>
                    <div className="login-forgot">
                        <Link to="/sign-up">
                            Create an account?
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;