import React, { useState } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Ragister from "./Ragister";
import GoogleButton from "react-google-button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "../../axios";
import Axios from "axios";

const Login = ({ setUser, user }) => {
  const navigate = useNavigate();
  const [accesstoken, setAccesstoken] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const password = e.target.password.value;
    const data = {
      name,
      password,
    };
    const res = await axios.post("/login", data);
    console.log(res.data);
    if (res?.data?.token) {
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/mytudos");
    }
  };
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setAccesstoken(codeResponse.access_token);
      localStorage.setItem("accesstoken", codeResponse.access_token);
    },
  });
  const fetchUser = async (newuser) => {
    const { data } = await Axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${newuser}`
    );
    console.log(data);
    const res = await axios.post("/register", {
      name: data.name,
      password: data.id,
    });
    if (res?.data?.token) {
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
      navigate("/mytudos");
    }
  };
  useEffect(() => {
    if (accesstoken) {
      fetchUser(accesstoken);
    }
  }, [accesstoken]);
  useEffect(() => {
    if (user) {
      navigate("/mytudos");
    }
  }, [user]);

  return (
    <div className="signup">
      <div className="login">
        <h1>LOGIN</h1>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="name" name="name" /> <br />
          <input type="password" placeholder="Password" name="password" />{" "}
          <br />
          <button type="submit">Login</button>
        </form>
        <h1>or</h1>
        <GoogleButton onClick={login}>Login with Google</GoogleButton>
      </div>
      <Ragister setUser={setUser} user={user} />
    </div>
  );
};

export default Login;
