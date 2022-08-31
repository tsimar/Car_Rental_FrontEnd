import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../url";
import "../../style/login.css";

import { useDispatch } from "react-redux";
import { newLogin } from "../../redux/loginSlice";
import { newUser } from "../../redux/newUserSlice";
import imgLogo from "../../jpeg/favicon.png";
const api = axios.create({ baseURL: `${url}/users` });

const Login = () => {
  const dispatch = useDispatch();
  const dispNewUser = useDispatch();
  const [post, setPost] = useState([]);
  const [userLogin, setUserLogin] = useState({
    login: "",
    password: "",
  });

  const fetchPosts = async () => {
    try {
      const res = await api.get(
        `/login/${userLogin.login}/${userLogin.password}`
      );

      if (res.data.userName === userLogin.login) {
        dispatch(newLogin({ title: false }));
        setPost(res.data);
      } else {
        console.log("sdfggsdfgsdfgsdg");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const newUserPage = (e) => {
    e.preventDefault();
    dispNewUser(newUser({ title: true }));
    dispatch(newLogin({ title: false }));
  };

  const submitLogin = (e) => {
    e.preventDefault();

    fetchPosts();
    // console.log(...post);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newLogin = { ...userLogin };
    newLogin[fieldName] = fieldValue;
    setUserLogin(newLogin);
  };

  return (
    <div className="body-login">
      <div className="wrrop-img">
        <img className="logoImg" src={imgLogo} alt="logo" />
        <p>Login Page</p>
      </div>
      <form className="page-login " onSubmit={submitLogin}>
        <div className="wrrop-login wrrop-div">
          <label htmlFor="login">login</label>
          <input
            type="text"
            name="login"
            id="login"
            placeholder="login"
            onChange={handleChange}
          />
        </div>
        <div className="wrrop-password wrrop-div">
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btnSubmit" onClick={submitLogin}>
            Login
          </button>
          <button className="btnSubmit" onClick={newUserPage}>
            SendIn
          </button>
        </div>
      </form>
    </div>
  );
};
export default Login;
