import React from 'react'
import "./User.css";

const EditableRow = ({
  editFormData,
  handleEditCompFormChange,
  handleCancelCompClick,
}) => {
  return (
    <tr border={"2"} className={"user-tab"}>
      <td></td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name"
          name="userName"
          value={editFormData.userName}
          onChange={handleEditCompFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a password"
          name="userPassword"
          value={editFormData.userPassword}
          onChange={handleEditCompFormChange}
        ></input>
      </td>

      <td></td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelCompClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditableRow