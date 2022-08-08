import React, { useState } from "react";
import axios from "axios";
import { url } from "../server/url";
import "../style/login.css";
const api = axios.create({ baseURL: `${url}/branchCompany` });
const Login = () => {
  const [userLogin, setUserLogin] = useState({
    login: "",
    password: "",
  });

  const submitLogin = (e) => {
    e.preventDefault();
    // console.log(e);
    const fetchDATAEmpl = async () => {
      const getEmpl = apiEmpl.get(`/login/${userLogin.login}`);
      axios.all([getEmpl]).then(
        axios.spread((...allData) => {
          setLoadingEmpl(true);
          const getEmplAll = allData[0];
          // const allDataComp = allData[1]
          console.log("getEmplAll" + getEmplAll.data);
          setPostsEmpl(getEmplAll.data);
          setLoadingEmpl(false);
        })
      );
    };
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
      <div>
        <img src="" alt="logo" />
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
        <button className="btnSubmit" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
