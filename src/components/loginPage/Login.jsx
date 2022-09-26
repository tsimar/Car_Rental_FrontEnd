import React, { useReducer, useState, useRef, useEffect } from "react";
import axios from "axios";
import { url } from "../../url";
import "../../style/login.css";

import { useDispatch } from "react-redux";
import { newLogin } from "../../redux/loginSlice";
import { newUser } from "../../redux/newUserSlice";
import { userOrDeveloper } from "../../redux/userUse";
import imgLogo from "../../jpeg/favicon.png";

const api = axios.create({ baseURL: `${url}/users` });

const Login = () => {
  const dispatch = useDispatch();
  const dispNewUser = useDispatch();
  const disUserUse = useDispatch();
  const [inputErrorClass, setInputErrorClass] = useState(false);
  const [inputValues, setInputValues] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    { login: "", password: "" }
  );

  const { onClickOutside } = { ...inputValues };
  const ref = useRef(null);

  const fetchPosts = async () => {
    try {
      const res = await api.get(
        `/login/${inputValues.login}/${inputValues.password}`
      );

      if (res.data.userName === inputValues.login) {
        dispatch(newLogin({ title: false }));
        disUserUse(userOrDeveloper({ title: false }));
      } else {
        setInputErrorClass(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
        dispatch(newLogin({ title: false }));
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  const newUserPage = (e) => {
    e.preventDefault();
    dispNewUser(newUser({ title: true }));
    dispatch(newLogin({ title: false }));
  };

  const submitLogin = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ [name]: value });
    setInputErrorClass(false);
  };

  return (
    <div className="body-login" ref={ref}>
      <div className="wrrop-img">
        <img className="logoImg" src={imgLogo} alt="logo" />
        <p>Login Page</p>
      </div>
      <form className="page-login " onSubmit={submitLogin}>
        <div className="wrrop-login wrrop-div">
          <label htmlFor="login">login</label>
          <input
            className={inputErrorClass ? "inputError" : "inputInit"}
            type="text"
            name="login"
            id="login"
            // value={post.userName}
            placeholder="login"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="wrrop-password wrrop-div">
          <label htmlFor="password">password</label>
          <input
            className={inputErrorClass ? "inputError" : "inputInit"}
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
