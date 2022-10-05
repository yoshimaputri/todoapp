import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Todo from "../components/Todo";
import "./Home.css";
import { wait } from "@testing-library/user-event/dist/utils";

const Home = () => {
    const [user, setUser] = useState(null);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
            setLoad(true);
            // wait(14).then(() => setLoad(true));
        } else {
            console.log("logged out");
            setUser(null);
        }
    }, []);

    return (
        <>
            <div className="home-container">
                {user ? (
                    <div className="signed-in">
                        <div className="header">
                            <h1>My Todo-Plan List</h1>
                            <h2>Welcome, <b>{user.username}</b> !</h2>
                        </div>
                        <Todo></Todo>
                    </div>
                ) : (
                    <div className="not-signed-in">
                        <h1>You are not signed in yet</h1>
                        <h3>Please sign in to continue or</h3>
                        <div className="login-forgot">
                            <Link to="/sign-up">
                                Create an account?
                            </Link>
                        </div>
                    </div>
                )}
            </div>

        </>
    );
}

export default Home;