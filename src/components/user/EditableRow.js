import React from 'react'
import "./User.css";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (
    <tr border={"2"} className="tab--tr">
      <td className="tab--td"></td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="Enter a name"
          name="userName"
          value={editFormData.userName}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="Enter a password"
          name="userPassword"
          value={editFormData.userPassword}
          onChange={handleEditFormChange}
        ></input>
      </td>

      <td className="tab--td"></td>
      <td className="tab--td">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
}
export default EditableRow