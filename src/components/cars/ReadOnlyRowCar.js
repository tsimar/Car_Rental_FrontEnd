import React from 'react'
import "../user/User.css"

const ReadOnlyRowCar = ({ item, handleEditClick, handleDeleteClick }) => {
  return (

    <tr border={"2"} className={"user-tab"} key={item.id}>

      <td width={"47"}>{item.id}</td>
      <td width={"196"}>{item.carBrand}</td>
      <td width={"250"}>{item.model}</td>
      <td width={"200"}>{item.carType}</td>
      <td width={"47"}>{item.productionDate}</td>
      <td width={"47"}>{item.color}</td>
      <td width={"196"}>{item.carMileage}</td>
      <td width={"250"}>{item.statusRental}</td>
      <td width={"200"}>{item.carStatus}</td>
      <td>
        <button type="button"
          onClick={(event) => handleEditClick(event, item)}>
          Edit
        </button>
        <button type="button" 
        onClick={()=>handleDeleteClick(item.id)}> 
        Delete
        </button>
      </td>
    </tr>

  )
}
export default ReadOnlyRowCar