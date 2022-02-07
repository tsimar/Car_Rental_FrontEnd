import React from 'react'
import "../user/User.css";

const ReadOnlyRowEmpl = ({ item, handleEditEmplClick, handleDeleteEmplClick }) => {
  return (
    <tr border={"2"} className={"user-tab"} key={item.id}>
      <td width={"50"}>{item.id}</td>
      <td width={"100"}>{item.name}</td>
      <td width={"100"}>{item.lastName}</td>
      <td width={"100"}>{item.position}</td>
      <td width={"50"}>{item.carRentalDepartID}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditEmplClick(event, item)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteEmplClick(item.id)}>
         
          Delete
        </button>
      </td>
    </tr>
  );
}
export default ReadOnlyRowEmpl