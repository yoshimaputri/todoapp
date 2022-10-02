import { useEffect, useState } from "react";
import Todo from "../components/Todo";
import "./Home.css";

const Home = () => {
    const [load, setLoading] = useState(false);
    const userData = {
        id: "yoshi",
        username: "Yoshima",
        password: "1234",
    }
    const [user, setUser] = useState(null);
    const todoData = {
        uuid: "",
        author: "", //userdata.id
        title: "",
        contents: "",
        remindAt: "",
        createdAt: Date.now(),
        updatedAt: "",
        deletedAt: "",
    }

    const checktodoData = () => {
        const check = localStorage.getItem("todo");
        if (check) {
            const todo = JSON.parse(localStorage.getItem("todo"));
            if (todo.remindAt < Date.now()) {
                todo.remindAt = "";
                const timegap = Date.now() - todo.remindAt;
                alert("Your todo:", todo.title, " is expired in ", timegap, "day(s)");
            }
        } else {
            return null;
        }
    }

    const notify = () => {
        if (user) {
            alert("You are logged in")
            checktodoData()
        } else {
            alert("You are not logged in");
        }
    };

    useEffect(() => {
        window.localStorage.getItem("user") && setUser(JSON.parse(window.localStorage.getItem("user")));
        notify();
        // testing
        // console.log(userData);
        // window.localStorage.setItem("user", JSON.stringify(userData));
        // setUser(userData);
        setLoading(true);
    }, []);

    return load ? (
        <>
            <div className="home-container">
                {user ? (
                    <div className="signed-in">
                        <h1>Welcome, {user.username}</h1>
                        <Todo></Todo>
                    </div>
                ) : (
                    <div className="not-signed-in">
                        <h1>Not signed in yet</h1>
                        <a href="http://localhost:3000/signin">
                            <button>Create an account?</button>
                        </a>
                    </div>
                )}
            </div>

        </>
    ) : null;
}

export default Home;