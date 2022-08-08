import React, { useState, Fragment } from "react";

import CarsBranchHook from "./CarsBranchHook";
import "./Cars.css";
// const apiCar = axios.create({ baseURL: "http://localhost:8080/cars" });

const TableCars = ({ addCompanyId, postsCar }) => {
  //   console.log("hello carsBranchHook", postsCar);
  if (addCompanyId === "n") {
    return <h2>hello table</h2>;
  }
};
export default TableCars;
