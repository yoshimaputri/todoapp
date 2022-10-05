import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { v4 as uuidv4 } from "uuid";
import Btn from "../components/Button";

const SignUp = () => {
    const [user, setUser] = useState(null);
    const [redirect, setRedirect] = useState(false);

    let navigate = useNavigate();
    let userLIst = JSON.parse(localStorage.getItem("userList"));
    if (!userLIst) {
        userLIst = [];
    }

    const handle_signup = () => {
        if (user) {
            if (user.username && user.password) {
                let newUser = {
                    id: uuidv4(),
                    username: user.username,
                    password: user.password,
                }
                userLIst.push(newUser);
                localStorage.setItem("user", JSON.stringify(newUser));
                localStorage.setItem("userList", JSON.stringify(userLIst));
                setRedirect(true);
            } else {
                alert("Please fill all the fields");
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [redirect]);

    return (
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
                                    name="username"
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
                                    name="password"
                                    placeholder="Enter a password"
                                    autoComplete="current-password"
                                    onChange={(text) =>
                                        setUser((r) => ({ ...r, password: text.target.value }))
                                    }
                                />
                            </div>

                            <Btn buttonStyle='btn-red'
                                onClick={() => handle_signup()}
                            >
                                Sign Up
                            </Btn>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;