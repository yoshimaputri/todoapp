import { useState } from "react";
import Btn from "./Button";
import "./Todo.css";

const Todo = () => {
    const [todos, setTodos] = useState([
        { title: "todo-1", contents: "todo-1 contents", remindAt: "2021-08-01", createdAt: "2021-07-01", updatedAt: "2021-07-01", deletedAt: "" },
        { title: "todo-2", contents: "todo-2 contents", remindAt: "2021-08-02", createdAt: "2021-07-02", updatedAt: "2021-07-02", deletedAt: "" },
        { title: "todo-3", contents: "todo-3 contents", remindAt: "2021-08-03", createdAt: "2021-07-03", updatedAt: "2021-07-03", deletedAt: "" },
    ]);

    const addTodo = (title, contents, remindAt) => {
        const newTodos = [...todos, { title, contents, remindAt, createdAt: Date.now(), updatedAt: "", deletedAt: "" }];
        setTodos(newTodos);
    };

    const removeTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const updateTodo = (index, title, contents, remindAt) => {
        const newTodos = [...todos];
        newTodos[index].title = title;
        newTodos[index].contents = contents;
        newTodos[index].remindAt = remindAt;
        newTodos[index].updatedAt = Date.now();
        setTodos(newTodos);
    };

    const handle_update = (index) => {
        // make a pop up form!!!
        const title = prompt("Enter new title");
        const contents = prompt("Enter new contents");
        const remindAt = prompt("Enter new remindAt");
        updateTodo(index, title, contents, remindAt);
    };

    const handle_delete = (index) => {
        // make a pop up confirmation
        const newTodos = [...todos];
        newTodos[index].deletedAt = Date.now();
        setTodos(newTodos);
    };

    return (
        <div className="todo-list">
            <h1>Todo List</h1>
            <ul>
                {/* make a card component for todo */}
                {todos.map((todo, index) => (
                    <li key={index}>
                        {todo.deletedAt ? (
                            <div className="todo-card" style={{ color: "gray" }}>
                                <div>Title: {todo.title}</div>
                                <div>Contents: {todo.contents}</div>
                                <div>Reminder at: {todo.remindAt}</div>
                                <div>Created at: {todo.createdAt}</div>
                                <div>Updated at: {todo.updatedAt}</div>
                                <div>Deleted at: {todo.deletedAt}</div>
                            </div>
                        ) : (
                            <div className="todo-card">
                                <div>Title: {todo.title}</div>
                                <div>Contents: {todo.contents}</div>
                                <div>Reminder at: {todo.remindAt}</div>
                                <div>Created at: {todo.createdAt}</div>
                                <div>Updated at: {todo.updatedAt}</div>
                                <Btn className="update-btn" onClick={() => handle_update()}>UPDATE</Btn>
                                <Btn className="delete-btn" onClick={() => handle_delete()}>DELETE</Btn>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Todo;