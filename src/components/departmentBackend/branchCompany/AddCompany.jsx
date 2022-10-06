import React from "react";

const AddCompany = ({ handleAddFormChange }) => {
  return (
    <div>
      <div>
        <input
          className="container_add--input"
          //   ref={logoRef}
          type="text"
          name="logo"
          placeholder="logo department"
          required="required"
          onChange={handleAddFormChange}
        />
      </div>
      <div>
        <input
          className="container_add--input"
          type="text"
          name="nameRental"
          placeholder="name department ..."
          onChange={handleAddFormChange}
        />
      </div>
      <div>
        <input
          className="container_add--input"
          type="text"
          name="city"
          placeholder="city  ..."
          onChange={handleAddFormChange}
        />
      </div>
      <div>
        <input
          className="container_add--input"
          type="text"
          name="address"
          placeholder="address  ..."
          onChange={handleAddFormChange}
        />
      </div>
    </div>
  );
};
export default AddCompany;
