import React from 'react';
import { useNavigate } from "react-router-dom";
import axios from "../../axios";

const Ragister = ({setUser,user}) => {
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const password = e.target.password.value;
        const data = {
            name,
            password,
        };
        const res = await axios.post('/register', data);
        console.log(res.data);
        if (res?.data?.token) {
            setUser(res.data.user);
            localStorage.setItem('token', res.data.token);
            navigate('/mytudos')
        }
    }

    return (
        <div className="ragister">
            <h1>RAGISTER</h1>
            <form onSubmit={submitHandler}>
                <input type="text" required placeholder="name" name='name'/> <br />
                <input type="password" required placeholder="Password" name='password' /> <br />
                <button type="submit">Ragister</button>
            </form>
        </div>
    );
}

export default Ragister;
