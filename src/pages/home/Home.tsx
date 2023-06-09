import React, { useEffect } from "react";
import { TodoProvider } from "../../context/TodoContext";
import TodoList from "../../components/TodoList";
import TodoForm from "../../components/TodoForm";
import Logout from "../../components/Logout";
import axios from "axios";
import { useAuth, useAuthDispatch } from "../../context/AuthContext";

const Home = () => {
  const user = useAuth();
  const dispatch = useAuthDispatch();

  const getTodos = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      window.location.href = "/login";
    }
    dispatch({ type:"TODOS_START"})
    const todos = await axios.get("http://localhost:4000/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return todos
  }

  useEffect(() => {
    const todos =  getTodos();
    todos.then((res) => {
      dispatch({type:"TODOS"})
    }).catch((err) => {
      console.log({ err });
    })
  }, [dispatch]);

  if (user.isLoading) {
    return <div>Loading...</div>
  }
  if (user.isAuthorized === false) {
    return (
      <>
        <div>Not Authorized to view TODOS. Please Login again</div>
        <button
          onClick={() => {
            dispatch({ type: "LOGOUT" });
            window.location.href = '/login'
          }}
        >
          Login
        </button>
      </>
    )
  }

  return (
    <TodoProvider>
      <h1>Todo App</h1>
        <p>Welcome {user.user}</p>
        <Logout />
      <TodoForm />
      <TodoList />
    </TodoProvider>
  );
};

export default Home;
