import React, { useState, useEffect } from "react";

import axios from "axios";
import { url } from "../url";
import "./selectDepartmentLoginPage.css";
const api = axios.create({ baseURL: `${url}/branchCompany` });

export const SelectDepartmentLoginPage = () => {
  const [departments, setDepartments] = useState();
  const [dataOption, setDataOption] = useState([]);
  //   const [dataOptionTest, setDataOptionTest] = useState([]);

  const fetchPost = async () => {
    // setLoading(true);
    const res = await api.get("/");
    setDataOption(res.data);
    setDepartments(res.data[0]);
    // setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const handelChange = (e) => {
    const selectId = e.target.value;
    const selectDepartmentState = dataOption.filter(
      (item) => item.id == selectId
    )[0];

    setDepartments(selectDepartmentState);
  };

  const handleComBox = () => {
    return dataOption.map((item) => (
      <option key={item.id} value={item.id}>
        {item.nameRental}
      </option>
    ));
  };

  return (
    <div className="wrrop-div">
      <label htmlFor="Offices">Offices</label>
      <div className="wrrop-select-department ">
        <select id="department" value={departments?.id} onChange={handelChange}>
          {handleComBox()}
        </select>
        <label className="city">{departments?.city}</label>
        <label className="address">{departments?.address}</label>
        <label>{departments?.id}</label>
      </div>
    </div>
  );
};
