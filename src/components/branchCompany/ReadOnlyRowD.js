import React from 'react'
import "../user/User.css";

const ReadOnlyRowD = ({ item, handleEditClick, handleDeleteClick,handleAddCars }) => {
  return (

    <tr border={"2"} className={"user-tab"} key={item.id} >
 
      <td width={"47"}>{item.id}</td>
      <td width={"196"}>{item.logo}</td>
      <td width={"250"}>{item.nameRental}</td>
      <td width={"200"}>{item.city}</td>
      <td width={"200"}>{item.address}</td>
      <td>
        <button type="button"
          onClick={(event) => handleEditClick(event, item)}>
          Edit
        </button>
        <button type="button"
          onClick={() => handleDeleteClick(item.id)}>
          Delete
        </button>
        <button type="button"
          onClick={() => handleAddCars(item.id,item.nameRental)}>
          Cars
        </button>
      </td>
    </tr>

  )
}
export default ReadOnlyRowD