import React from "react";

const AddUser = ({ handleAddFormChange, handleAddFormSubmit }) => {
  return (
    <div>
      <input
        className="tab--input"
        type="text"
        name="userName"
        placeholder="login..."
        required="required"
        onChange={handleAddFormChange}
      />
      <input
        className="tab--input"
        type="text"
        name="userPassword"
        required="required"
        placeholder="password..."
        onChange={handleAddFormChange}
      />
      <input
        className="tab--input"
        type="text"
        name="rola"
        required="rola"
        placeholder="position..."
        onChange={handleAddFormChange}
      />
    </div>
  );
};

export default AddUser;
