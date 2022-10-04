import Btn from "./Button";
import "./Todo.css";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { useAlert } from "react-alert";
import { IoCreateOutline } from 'react-icons/io5';

const Todo = () => {
    const [load, setLoaded] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const [form, openForm] = useState(false);
    const [search, setSearch] = useState({
        type: "title",
        value: ""
    });
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    if (!todoList) {
        todoList = [];
    }
    const alert = useAlert();

    const [userTodoList, setUserTodoList] = useState(todoList.filter(todo => todo.authorId === user.id));
    let moment = require('moment'); // library for converting timestamps to date strings

    const saveLocalStorage = () => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        window.location.reload();
    }

    const handleCloseForm = () => {
        openForm(false);
    };

    const [todo, setTodo] = useState({
        title: "",
        contents: "",
        remindAt: ""
    });

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
        addTodo(todo.title, todo.contents, todo.remindAt);
        openForm(false);
        window.location.reload();
    };

    const handle_update = (id) => {

        // updateTodoById(id, title, contents, remindAt);
    };

    const handle_delete = (id) => {
        removeTodoById(id);
    };

    const handle_search = () => {
        // setUserTodoList(todoList.filter(todo => todo.authorId === user.id));
        if (search.type === "title") {
            console.log('search title:', search.value, typeof (search.value));
            setUserTodoList(todoList.filter(
                (todo) => {
                    if (todo.authorId === user.id && todo.title) {
                        return todo.title.toLowerCase().includes(search.value.toString().toLowerCase());
                    }
                    return false
                }
            ))
        } else if (search.type === "contents") {
            console.log('search contents:', search.value);
            setUserTodoList(todoList.filter(
                (todo) => {
                    if (todo.authorId === user.id && todo.contents) {
                        return todo.contents.toLowerCase().includes(search.value.toString().toLowerCase());
                    }
                    return false
                }
            )
            )
        }

    }

    const load_todo = () => {
        console.log(userTodoList)
        const sortedTodo = userTodoList.sort((a, b) => moment(a.createdAt).format('YYYYMMDD') - moment(b.createdAt).format('YYYYMMDD'));

        return userTodoList !== [] ? (
            <ul className="todo-list">
                {/* a card component for todo */}
                {sortedTodo.reverse().map((todo, _) => (
                    todo.deletedAt ? (
                        null
                        // <li key={todo.id} className="todo-card">
                        //     <div style={{ color: "gray" }}>
                        //         {/* <div>ID: {todo.id}</div> */}
                        //         <div className="todo-title">{todo.title}</div>
                        //         <div className="todo-content"><i>Contents:</i> {todo.contents}</div>
                        //         <div className="todo-date"><b>Reminder at:</b> {moment(todo.remindAt).format('MM/DD/YYYY, h:mm a')}</div>
                        //         <div className="todo-date"><i>Created at: {moment(todo.createdAt).format('MM/DD/YYYY, h:mm a')}</i></div>
                        //         <div className="todo-date">Updated at: {moment(todo.updatedAt).format('MM/DD/YYYY, h:mm a')}</div>
                        //         <div className="todo-date">Deleted at: {moment(todo.deletedAt).format('MM/DD/YYYY, h:mm a')}</div>
                        //     </div>
                        // </li>
                    ) : (
                        <li key={todo.id} className="todo-card">
                            <div>
                                {/* <div>ID: {todo.id}</div> */}
                                <div className="todo-title">{todo.title}</div>
                                <div className="todo-content"><i>Contents:</i> {todo.contents}</div>
                                <div className="todo-date"><b>Reminder at:</b> {moment(todo.remindAt).format('MM/DD/YYYY, h:mm a')}</div>
                                <div className="todo-date">Created at: {moment(todo.createdAt).format('MM/DD/YYYY, h:mm a')}</div>
                                <div className="todo-date">Updated at: {moment(todo.updatedAt).format('MM/DD/YYYY, h:mm a')}</div>
                                <Btn buttonStyle={'btn-blue'} className="update-btn" onClick={() => {
                                    setTodo((r) => ({ ...r, title: todo.title, contents: todo.contents, remindAt: todo.remindAt }));
                                    openForm(true);
                                }}>UPDATE</Btn>
                                <Btn buttonStyle={'btn-red'} className="delete-btn" onClick={() => handle_delete(todo.id)}>DELETE</Btn>
                            </div>
                        </li>
                    )
                ))}
            </ul>
        ) : (
            <div className="no-todo">No todo</div>
            // <ul className="todo-list">
            //     <li className="todo-card">There is no todo</li>
            // </ul>
        );
    }

    useEffect(() => {
        load_todo();
        setLoaded(true);
    }, [userTodoList]);

    return load ? (
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
            {load_todo()}
            {/* {load_deleted_todo()} */}
            <Btn onClick={() => openForm(true)}>Create</Btn>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={form}
                onClose={handleCloseForm}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={form}>
                    <div className="modal-form">
                        <h2 id="transition-modal-title">Create Todo</h2>
                        <div className="inp-modal">
                            <input type="text" placeholder="Title" value={todo ? todo.title : null} onChange={(e) => setTodo((r) => ({ ...r, title: e.target.value }))} />
                            <input type="text" placeholder="Contents" value={todo ? todo.contents : null} onChange={(e) => setTodo((r) => ({ ...r, contents: e.target.value }))} />
                            <input type="datetime-local" value={todo ? todo.remindAt : null} onChange={(e) => setTodo((r) => ({ ...r, remindAt: e.target.value }))} />
                        </div>
                        <Btn buttonStyle={'btn-blue'} onClick={() => handle_create()}>Create <IoCreateOutline /></Btn>
                    </div>
                </Fade>
            </Modal>
        </div >
    ) : (null);
};

export default Todo;