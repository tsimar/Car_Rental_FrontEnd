// import { appendInfiniteContent } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import React, { useState } from "react";

import { SelectDepartmentLoginPage } from "../../../server/SelectDepartmentLoginPage";
import imgLogo from "../../../jpeg/favicon.png";
import { useDispatch } from "react-redux";
import { newUser } from "../../../redux/newUserSlice";
import { url } from "../../../url";
import "./newCustomer.css";
import "../../../style/login.css";

const api = axios.create({ baseURL: `${url}/users` });

export const NewCustomer = () => {
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState({

    nameCustomer: "",
    lastNameCustomer: "",
    address: "",
    email: "",
    userName: "",
    userPassword: "",
  });

  const handelSave = (e) => {
    e.preventDefault();
    dispatch(newUser({ title: false }));
    console.log(customer);
    api
      .post("/", customer)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    dispatch(newUser({ title: false }));
  };
  const handleChange = (e) => {
    e.preventDefault();
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    const newLogin = { ...customer };
    newLogin[fieldName] = fieldValue;
    setCustomer(newLogin);
  };
  return (
    <div className="body-login">
      <div className="div-nameAndImg">
        <img className="logoImg" src={imgLogo} alt="logo" />
        <p className="div-nameAndImg-p">New User Page</p>
      </div>
      <form className="page-login wrrop-div" onSubmit={handelSave}>
        <div className="wrrop-div ">
          <SelectDepartmentLoginPage />
        </div>
        <div className="wrrop-login wrrop-div">
          <label htmlFor="nameCustomer">login</label>
          <input
            type="text"
            name="nameCustomer"
            id="nameCustomer"
            placeholder="first name"
            onChange={handleChange}
          />
        </div>
        <div className="wrrop-login wrrop-div">
          <label htmlFor="lastNameCustomer">login</label>
          <input
            type="text"
            name="lastNameCustomer"
            id="lastNameCustomer"
            placeholder="last name"
            onChange={handleChange}
          />
        </div>
        <div className="wrrop-login wrrop-div">
          <label htmlFor="email">login</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleChange}
          />
        </div>
        <div className="wrrop-login wrrop-div">
          <label htmlFor="address">login</label>
          <input
            type="text"
            name="address"
            id="address"
            placeholder="address"
            onChange={handleChange}
          />
        </div>
        <div className="wrrop-login wrrop-div">
          <label htmlFor="userName">login</label>
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="login"
            onChange={handleChange}
          />
        </div>
        <div className="wrrop-password wrrop-div">
          <label htmlFor="userPassword">password</label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button className="btnSave" onClick={handelSave}>
            Save
          </button>
          <button className="btnSubmit" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
