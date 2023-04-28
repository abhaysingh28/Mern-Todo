import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Home/Login";
import Ragister from "./Components/Home/Ragister";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Components/Home/Todo";
import { useState } from "react";
import { useEffect } from "react";
import axios from "./axios";

const App = () => {
  const [user, setUser] = useState(null);
  const refereshUser = async () => {
    const res = await axios.get("/refresh", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setUser(res.data);
  };
  useEffect(() => {
    localStorage.getItem("token") && refereshUser();
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login setUser={setUser} user={user} />} />
          <Route path="/mytudos" element={<Todo user={user} />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
