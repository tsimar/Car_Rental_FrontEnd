import React from "react";
import axios from "axios";
import { url } from "../../url";
import { SelectDepartmentLoginPage } from "../../server/SelectDepartmentLoginPage";
const api = axios.create({ baseURL: `${url}/branchCompany` });

const Offer = () => {
  const handleSelectDepartment = (departId) => {};
  return (
    <div>
      <SelectDepartmentLoginPage
        handleSelectDepartment={handleSelectDepartment}
      />
    </div>
  );
};
export default Offer;
