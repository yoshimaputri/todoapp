import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import "./Home.css";

const Home = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (localStorage.getItem("user")) {
            setUser(JSON.parse(localStorage.getItem("user")));
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
                        <h1>Not signed in yet</h1>
                    </div>
                )}
            </div>

        </>
    );
}

export default Home;