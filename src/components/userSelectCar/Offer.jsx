import React from "react";
import Cars from "./typeCar/Cars";
import { SelectDepartmentLoginPage } from "../../server/SelectDepartmentLoginPage";

const Offer = () => {
  return (
    <div>
      <SelectDepartmentLoginPage />
      <Cars />
    </div>
  );
};
export default Offer;
