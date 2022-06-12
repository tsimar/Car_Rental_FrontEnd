import React from "react";
import "../style/table.css";

const EditableRowEmpl = ({
  editFormDataEmpl,
  handleEditFormEmplChange,
  handleCancelEmplClick,
}) => {
  return (
    <tr border={"2"} className="tab--tr">
      <td className="tab--td"></td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="Enter a name"
          name="name"
          value={editFormDataEmpl.name}
          onChange={handleEditFormEmplChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="last Name"
          name="lastName"
          value={editFormDataEmpl.lastName}
          onChange={handleEditFormEmplChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="position"
          name="position"
          value={editFormDataEmpl.position}
          onChange={handleEditFormEmplChange}
        ></input>
      </td>

      <td className="tab--td"></td>
      <td className="tab--td">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelEmplClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditableRowEmpl;
