import React from "react";

const AddEmployee = ({ handleAddFormEmplChange }) => {
  return (
    <div>
      <input
        className="container_add--input"
        type="text"
        name="name"
        placeholder="name ..."
        onChange={handleAddFormEmplChange}
      />
      <input
        className="container_add--input"
        type="text"
        name="lastName"
        placeholder="last name ..."
        onChange={handleAddFormEmplChange}
      />
      <input
        className="container_add--input"
        type="text"
        name="position"
        placeholder="position  ..."
        onChange={handleAddFormEmplChange}
      />
    </div>
  );
};
export default AddEmployee;
