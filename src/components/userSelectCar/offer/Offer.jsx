import React from "react";
import Cars from "../typeCar/Cars";
import { SelectDepartmentLoginPage } from "../../../server/SelectDepartmentLoginPage";
import "./offer.css";
const Offer = () => {
  return (
    <div className="wrrop-div-offer">
      <section className="section-department">
        <SelectDepartmentLoginPage />
      </section>
      <section className="section-cars">
        <Cars />
      </section>
    </div>
  );
};
export default Offer;
