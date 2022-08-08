import React from "react";
import "../../../style/table.css";

const EditableRowD = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr className="tab--tr">
      <td></td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          name="logo"
          placeholder="logo department"
          required="required"
          value={editFormData.logo}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          name="nameRental"
          placeholder="name department ..."
          required="required"
          value={editFormData.nameRental}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          name="city"
          required="required"
          placeholder="city  ..."
          value={editFormData.city}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          name="address"
          required="required"
          placeholder="address  ..."
          value={editFormData.address}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td className="tab--td">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditableRowD;
