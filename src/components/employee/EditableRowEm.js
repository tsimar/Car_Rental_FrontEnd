import React from 'react'
import "../user/User.css";

const EditableRowEm = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (

    <tr border={"2"} className={"user-tab"} >
      <td></td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a name"
          name="Name"
          value={editFormData.name}
          onChange={handleEditFormChange}

        >

        </input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="last Name"
          name="lastName"
          value={editFormData.lastName}
          onChange={handleEditFormChange}
        >

        </input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="position"
          name="position"
          value={editFormData.position}
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
export default EditableRowEm