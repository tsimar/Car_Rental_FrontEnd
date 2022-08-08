import React, { useState } from "react";
import axios from "axios";
import { url } from "../../url";
import "../../style/login.css";

import { useDispatch } from "react-redux";
import { loginSlice, newLogin } from "../../redux/loginSlice";
const api = axios.create({ baseURL: `${url}/branchCompany` });

const Login = () => {
  const dispatch = useDispatch();

  const [userLogin, setUserLogin] = useState({
    login: "",
    password: "",
  });
  const newUserPage = (e) => {
    console.log("lsdjfsffffffffffff");
  };
  const submitLogin = (e) => {
    e.preventDefault();
    dispatch(newLogin({ title: false }));
    // console.log(e);
    // const fetchDATAEmpl = async () => {
    //   const getEmpl = apiEmpl.get(`/login/${userLogin.login}`);
    //   axios.all([getEmpl]).then(
    //     axios.spread((...allData) => {
    //       setLoadingEmpl(true);
    //       const getEmplAll = allData[0];
    //       // const allDataComp = allData[1]
    //       console.log("getEmplAll" + getEmplAll.data);
    //       setPostsEmpl(getEmplAll.data);
    //       setLoadingEmpl(false);
    //     })
    //   );
    // };
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
