import React from 'react'
import "../user/User.css";

const EditableRowCar = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (

    <tr border={"2"} className={"user-tab"} >
      <td></td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name"
          name="carBrand"
          value={editFormData.carBrand}
          onChange={handleEditFormChange}

        >

        </input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a password"
          name="model"
          value={editFormData.model}
          onChange={handleEditFormChange}
        >

        </input>
      </td>

      <td></td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </td>
    </tr>

  )
}
export default EditableRowCar