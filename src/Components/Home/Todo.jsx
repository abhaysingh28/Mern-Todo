import React from "react";
import Mytodos, { fetchtudos } from "./todos/MyTodos";
import "./home.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const Todo = ({ user }) => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    if (!user) navigate("/");
  }, [user]);
  const fetchtudos = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("/allTudos", {
      headers: {
        Authorization: token,
      },
    });
    setTodos(res.data);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const data = {
      title,
      description,
    };
    const res = await axios.post("/addTodos", data, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    fetchtudos();
  };
  return (
    <div className="cnt">
      <h2>Welcome {user?.name}</h2>
      <div className="todos">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Enter your today task.."
            name="title"
          />
          <br />
          <input type="text" placeholder="description" name="description" />
          <br />
          <button type="submit">add</button>
        </form>
      </div>
      <div className="addalltodos">
        <Mytodos todos={todos} fetchtudos={fetchtudos} />
      </div>
    </div>
  );
};

export default Todo;
