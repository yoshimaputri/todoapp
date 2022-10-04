import Btn from "./Button";
import "./Todo.css";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useState } from "react";

const Todo = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [search, setSearch] = useState({
        type: "title",
        value: ""
    });
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    if (!todoList) {
        todoList = [];
    }

    let userTodoList = todoList.filter(todo => todo.authorId === user.id);
    let moment = require('moment');

    const saveLocalStorage = () => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        window.location.reload();
    }

    const addTodo = (title, contents, remindAt) => {
        let newTodo = {
            id: uuidv4(),
            authorId: user.id,
            title: title,
            contents: contents,
            remindAt: remindAt,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            deletedAt: null,
        }
        todoList.push(newTodo);
        saveLocalStorage();
    };

    const updateTodoById = (id, title, contents, remindAt) => {
        let todo = todoList.find(todo => todo.id === id);
        todo.title = title;
        todo.contents = contents;
        todo.remindAt = remindAt;
        todo.updatedAt = Date.now();
        saveLocalStorage();
    };

    const removeTodoById = (id) => {
        let todo = todoList.find((todo) => todo.id === id);
        todo.deletedAt = Date.now();
        saveLocalStorage();
    };

    const handle_create = () => {
        const title = prompt("Title");
        const contents = prompt("Contents");
        const remindAt = prompt("Remind at");
        addTodo(title, contents, remindAt);
    }

    const handle_update = (id) => {
        const title = prompt("Enter new title");
        const contents = prompt("Enter new contents");
        const remindAt = prompt("Enter new remindAt");
        updateTodoById(id, title, contents, remindAt);
    };

    const handle_delete = (id) => {
        removeTodoById(id);
    };

    const handle_search = () => {
        if (search.type === "title") {
            console.log('search title:', search.value, typeof (search.value));
            userTodoList = userTodoList.filter(
                (todo) => {
                    if (todo.title) {
                        return todo.title.toLowerCase().includes(search.value.toString().toLowerCase());
                    }
                    return false
                }
            )
        } else if (search.type === "contents") {
            console.log('search contents:', search.value);
            userTodoList = userTodoList.filter(
                (todo) => {
                    if (todo.title) {
                        return todo.title.toLowerCase().includes(search.value.toString().toLowerCase());
                    }
                    return false
                }
            )
        }

    }

    return (
        <div className="todo-container">
            <h1>My Todo-Plan List</h1>
            <div className="todo-search">
                <div>
                    <select value={search.type} onChange={(e) => setSearch((r) => ({ ...r, type: e.target.value }))}>
                        <option key='title' value="title">Title</option>
                        <option key='contents' value="contents">Contents</option>
                    </select>
                </div>
                <div className="inp-text"><input type="text" placeholder="Search" onChange={(e) => setSearch((r) => ({ ...r, value: e.target.value }))} /></div>
                <div><Btn buttonStyle={'btn-yellow'} onClick={() => handle_search()}>SEARCH</Btn></div>
                <div><Btn buttonStyle={'btn-gray'} onClick={() => window.location.reload()}>RESET</Btn></div>
            </div >
            <ul className="todo-list">
                {/* make a card component for todo */}
                {userTodoList.map((todo, _) => (
                    <li key={todo.id} className="todo-card">
                        {todo.deletedAt ? (
                            <div style={{ color: "gray" }}>
                                {/* <div>ID: {todo.id}</div> */}
                                <div className="todo-title">{todo.title}</div>
                                <div className="todo-content">Contents: {todo.contents}</div>
                                <div className="todo-date">Reminder at: {moment(todo.remindAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <div className="todo-date">Created at: {moment(todo.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <div className="todo-date">Updated at: {moment(todo.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <div className="todo-date">Deleted at: {moment(todo.deletedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                            </div>
                        ) : (
                            <div>
                                {/* <div>ID: {todo.id}</div> */}
                                <div className="todo-title">{todo.title}</div>
                                <div className="todo-content">Contents: {todo.contents}</div>
                                <div className="todo-date">Reminder at: {moment(todo.remindAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <div className="todo-date">Created at: {moment(todo.createdAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <div className="todo-date">Updated at: {moment(todo.updatedAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <Btn  buttonStyle={'btn-blue'} className="update-btn" onClick={() => handle_update(todo.id)}>UPDATE</Btn>
                                <Btn  buttonStyle={'btn-red'} className="delete-btn" onClick={() => handle_delete(todo.id)}>DELETE</Btn>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <Btn onClick={() => handle_create()}>Create</Btn>
        </div >
    );
};

export default Todo;