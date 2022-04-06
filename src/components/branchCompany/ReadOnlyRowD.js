import React from "react";

import "../user/User.css";

const ReadOnlyRowD = ({
  item,
  handleEditClick,
  handleDeleteClick,
  handleVisibleCarsClick,
}) => {
  return (
    <tr
      className={"user-tab"}
      key={item.id}
      onClick={(event) => handleVisibleCarsClick(event, item.id)}
    >
      <td width={"auto"}>{item.id}</td>
      <td width={"auto"}>{item.logo}</td>
      <td width={"auto"}>{item.nameRental}</td>
      <td width={"auto"}>{item.city}</td>
      <td width={"auto"}>{item.address}</td>
      <td>
        <button type="button" onClick={(event) => handleEditClick(event, item)}>
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ReadOnlyRowD;
