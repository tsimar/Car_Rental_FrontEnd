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
          placeholder="car Brand"
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
          placeholder="model"
          name="model"
          value={editFormData.model}
          onChange={handleEditFormChange}
        >
        </input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="car Type"
          name="carType"
          value={editFormData.carType}
          onChange={handleEditFormChange}
        >
        </input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="production Date"
          name="productionDate"
          value={editFormData.productionDate}
          onChange={handleEditFormChange}
        >
        </input>
      </td> <td>
        <input
          type="text"
          required="required"
          placeholder="color"
          name="color"
          value={editFormData.color}
          onChange={handleEditFormChange}
        >
        </input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="car Mileage"
          name="carMileage"
          value={editFormData.carMileage}
          onChange={handleEditFormChange}
        >
        </input>
      </td> 
      <td>
        <input
          type="text"
          required="required"
          placeholder="status Rental"
          name="statusRental"
          value={editFormData.statusRental}
          onChange={handleEditFormChange}
        >
        </input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="car Status"
          name="carStatus"
          value={editFormData.carStatus}
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