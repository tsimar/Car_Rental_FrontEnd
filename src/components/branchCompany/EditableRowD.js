import React from 'react'
import "../user/User.css";

const EditableRowD = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
  return (

    <tr border={"2"} className={"user-tab"} >
      <td></td>
      <td>
        <input
          type='text'
          name='logo'
          placeholder='logo department'
          required="required"
          value={editFormData.logo}
          onChange={handleEditFormChange}
        >
        </input>
      </td>
      <td>
        <input
          type='text'
          name='nameRental'
          required="required"
          placeholder='name department ...'
          value={editFormData.nameRental}
          onChange={handleEditFormChange}
        > </input>
      </td>
      <td>
        <input
          type='text'
          name='city'
          required="required"
          placeholder='city  ...'
          value={editFormData.city}
          onChange={handleEditFormChange}
        > </input>
      </td>
      <td>
        <input
          type='text'
          name='address'
          required="required"
          placeholder='address  ...'
          value={editFormData.address}
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
export default EditableRowD