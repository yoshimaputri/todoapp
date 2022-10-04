import Btn from "./Button";
import "./Todo.css";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { useEffect, useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
// import { useAlert } from "react-alert";
import { IoCreateOutline } from 'react-icons/io5';
import { AiFillDelete, AiOutlineSearch, AiOutlineDelete } from 'react-icons/ai';
import { VscDiffAdded } from 'react-icons/vsc';
import { GrPowerReset } from 'react-icons/gr';
import { GiCancel } from 'react-icons/gi';

const Todo = () => {
    const [load, setLoaded] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));
    const [form, openForm] = useState(false);
    const [confirm, openConfirm] = useState(false);
    const [showTrash, setShowTrash] = useState(false);
    const [search, setSearch] = useState({
        type: "title",
        value: ""
    });
    let todoList = JSON.parse(localStorage.getItem("todoList"));
    if (!todoList) {
        todoList = [];
    }
    // const alert = useAlert();

    const [userTodoList, setUserTodoList] = useState(todoList.filter(todo => todo.authorId === user.id));
    let moment = require('moment'); // library for converting timestamps to date strings

    const saveLocalStorage = () => {
        localStorage.setItem("todoList", JSON.stringify(todoList));
        window.location.reload();
    }

    const handleCloseForm = () => {
        openForm(false);
    };

    const handleCloseConfirm = () => {
        openConfirm(false);
    };

    const [todo, setTodo] = useState({
        id: "",
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
        let todo_item = todoList.find(i => i.id === id);
        todo_item.title = title;
        todo_item.contents = contents;
        todo_item.remindAt = remindAt;
        todo_item.updatedAt = Date.now();
        saveLocalStorage();
        setTodo((r) => ({ ...r, id: "", title: "", contents: "", remindAt: "" }));
    };

    const removeTodoById = (id) => {
        let todo_item = todoList.find((i) => i.id === id);
        todo_item.deletedAt = Date.now();
        saveLocalStorage();
        setTodo({ id: "", title: "", contents: "", remindAt: "" });
    };

    const handle_create = () => {
        setLoaded(false);
        addTodo(todo.title, todo.contents, todo.remindAt);
        openForm(false);
        window.location.reload();
    };

    const handle_update = () => {
        setLoaded(false);
        updateTodoById(todo.id, todo.title, todo.contents, todo.remindAt);
        openForm(false);
        window.location.reload();
    };

    const handle_delete = (id) => {
        removeTodoById(id);
        alert("Deleted successfully!");
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
                    todo.deletedAt !== null ? (
                        <li key={todo.id} className="todo-card">
                            <div>
                                {/* <div>ID: {todo.id}</div> */}
                                <div className="todo-title">{todo.title}</div>
                                <div className="todo-content"><i>Contents:</i> {todo.contents}</div>
                                <div className="todo-date"><b>Reminder at:</b> {moment(todo.remindAt).format('MM/DD/YYYY, h:mm a')}</div>
                                <div className="todo-date">Created at: {moment(todo.createdAt).format('MM/DD/YYYY, h:mm a')}</div>
                                <div className="todo-date">Updated at: {moment(todo.updatedAt).format('MM/DD/YYYY, h:mm a')}</div>
                                <Btn buttonStyle={'btn-blue'} className="update-btn" onClick={() => {
                                    setTodo((r) => ({ ...r, id: todo.id, title: todo.title, contents: todo.contents, remindAt: todo.remindAt }));
                                    openForm(true);
                                }}>UPDATE <IoCreateOutline /></Btn>
                                <Btn buttonStyle={'btn-red'} className="delete-btn" onClick={() => {
                                    setTodo((r) => ({ ...r, id: todo.id, title: todo.title, contents: todo.contents, remindAt: todo.remindAt }));
                                    openConfirm(true);
                                }}>DELETE <AiFillDelete /></Btn>
                            </div>
                        </li>


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
                        null
                    )
                ))}
                <Btn buttonStyle='btn-gray' className="trash" onClick={() => setShowTrash(!showTrash)}>
                    View My Bin <AiOutlineDelete />
                </Btn>
            </ul>
        ) : (
            false
        );
    }

    useEffect(() => {
        load_todo();
        setLoaded(true);
    }, [userTodoList]);

    return load ? (
        <div className="todo-container">
            <div className="todo-search">
                <div className="inp-select">
                    <select value={search.type} onChange={(e) => setSearch((r) => ({ ...r, type: e.target.value }))}>
                        <option key='title' value="title">Title</option>
                        <option key='contents' value="contents">Contents</option>
                    </select>
                </div>
                <div className="inp-text"><input type="text" placeholder="Search" onChange={(e) => setSearch((r) => ({ ...r, value: e.target.value }))} /></div>
                <div><Btn buttonStyle={'btn-yellow'} onClick={() => handle_search()}>SEARCH <AiOutlineSearch /></Btn></div>
                <div><Btn buttonStyle={'btn-gray'} onClick={() => window.location.reload()}>RESET <GrPowerReset /></Btn></div>
            </div >
            <div className="todo-list-container">
                {userTodoList.length > 0 ? (
                    load_todo()) : (
                    <div className="no-todo">
                        <h2>No Todo-Plan</h2>
                        <p>Click the button below to create a new todo-plan.</p>
                    </div>
                )}
            </div>
            <div className="btn-container">
                <Btn buttonStyle='btn-red' id='btn-create' onClick={() => openForm(true)}>CREATE <VscDiffAdded /></Btn>
            </div>
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
                        {todo.id ? (
                            <h2 id="transition-modal-title">Edit Todo Item</h2>
                        ) : (
                            <h2 id="transition-modal-title">Create Todo Item</h2>
                        )}
                        <div className="inp-modal">
                            <input type="text" placeholder="Title" value={todo ? todo.title : null} onChange={(e) => setTodo((r) => ({ ...r, title: e.target.value }))} />
                            <input type="text" placeholder="Contents" value={todo ? todo.contents : null} onChange={(e) => setTodo((r) => ({ ...r, contents: e.target.value }))} />
                            <input type="datetime-local" value={todo ? todo.remindAt : null} onChange={(e) => setTodo((r) => ({ ...r, remindAt: e.target.value }))} />
                        </div>
                        {todo.id ? (
                            <Btn buttonStyle={'btn-blue'} onClick={() => handle_update()}>SUBMIT <IoCreateOutline /></Btn>
                        ) : (
                            <Btn buttonStyle={'btn-blue'} onClick={() => handle_create()}>CREATE <VscDiffAdded /></Btn>
                        )}

                    </div>
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={confirm}
                onClose={handleCloseConfirm}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={confirm}>
                    <div className="modal-form">
                        <h2 id="transition-modal-title">Confirm Delete</h2>
                        <div id="transition-modal-description">Are you sure you want to delete this todo item?</div>
                        <div className="btn-del-container">
                            <Btn buttonStyle={'btn-red'} onClick={() => handle_delete(todo.id)}>YES <AiFillDelete /></Btn>
                            <Btn buttonStyle={'btn-gray'} onClick={() => handleCloseConfirm()}>CANCEL <GiCancel /></Btn>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div >
    ) : (null);
};

export default Todo;