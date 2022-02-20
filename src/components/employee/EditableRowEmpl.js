import React from "react";
import "../user/User.css";

const EditableRowEmpl = ({
  editFormDataEmpl,
  handleEditFormEmplChange,
  handleCancelEmplClick,
}) => {
  return (
    <tr border={"2"} className={"user-tab"}>
      <td></td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name"
          name="name"
          value={editFormDataEmpl.name}
          onChange={handleEditFormEmplChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="last Name"
          name="lastName"
          value={editFormDataEmpl.lastName}
          onChange={handleEditFormEmplChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="position"
          name="position"
          value={editFormDataEmpl.position}
          onChange={handleEditFormEmplChange}
        ></input>
      </td>
   

      <td></td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelEmplClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditableRowEmpl;
