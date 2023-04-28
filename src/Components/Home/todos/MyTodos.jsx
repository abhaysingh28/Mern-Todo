import React from "react";
import axios from "axios";
import "./myTodos.css";
import { useEffect, useState } from "react";

const MyTodos = ({ todos, fetchtudos }) => {
  useEffect(() => {
    fetchtudos();
  }, []);

  console.log(todos);

  const deleteHandler = async (id) => {
    const res = await axios.delete(`http://localhost:4000/api/delete/${id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
    fetchtudos();
  };
  return (
    <>
      <div className="alltodos">
        {todos?.map((todo, i) => (
          <div className="todo" key={i}>
            <h1>
              {todo.title} <span>{todo.description}</span>
            </h1>
            <h4 onClick={() => deleteHandler(todo._id)}>DELETE</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyTodos;
