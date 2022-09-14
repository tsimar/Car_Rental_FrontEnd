import React from "react";
import Cars from "./typeCar/Cars";
// import axios from "axios";
// import { url } from "../../url";
import { SelectDepartmentLoginPage } from "../../server/SelectDepartmentLoginPage";
// const api = axios.create({ baseURL: `${url}/branchCompany` });

const Offer = () => {
  const handleSelectDepartment = (e, departId) => {
    e.preventDefault();
    console.log(departId);
  };
  return (
    <div>
      <SelectDepartmentLoginPage />
      <Cars />
    </div>
  );
};
export default Offer;
