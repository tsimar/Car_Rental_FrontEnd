import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { newIdComp } from "../redux/idCompSlice";

import axios from "axios";
import { url } from "../url";
import "./selectDepartmentLoginPage.css";
const api = axios.create({ baseURL: `${url}/branchCompany` });

export const SelectDepartmentLoginPage = () => {
  const [departments, setDepartments] = useState();
  const [dataOption, setDataOption] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPost() {
      const res = await api.get("/");
      setDataOption(res.data);
      setDepartments(res.data[0]);
      // setLoading(false);
      console.log(res.data);
    }
    fetchPost();
  }, []);

  useEffect(() => {
    if (departments !== undefined) {
      dispatch(newIdComp({ title: departments.id }));
    }
  }, [departments, dispatch]);

  const handelChange = (e) => {
    const selectId = Number(e.target.value);
    const selectDepartmentState = dataOption.filter(
      (item) => item.id === selectId
    )[0];
    try {
      dispatch(newIdComp({ title: selectDepartmentState.id }));
    } catch (error) {
      console.log("brak id company");
    }

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
        <select
          className="input-department"
          id="department"
          typeof="text"
          value={departments?.id}
          onChange={handelChange}
        >
          {handleComBox()}
        </select>
        <label className="city">{departments?.city}</label>
        <label className="address">{departments?.address}</label>
        <label>{departments?.id}</label>
      </div>
    </div>
  );
};
