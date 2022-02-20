import React from "react";
import "./User.css";

const ReadOnlyRowComp = ({
  item,
  handleEditCompClick,
  handleDeleteCompClick,
  
}) => {
  return (
    <tr
      border={"2"}
      className={"user-tab"}
      key={item.id}
      // onClick={(event) => handleVisibleCarsClick(event, item.id)}
    >
      <td width={"47"}>{item.id}</td>
      <td width={"196"}>{item.userName}</td>
      <td width={"250"}>{item.userPassword}</td>
      <td width={"200"}>{item.customer}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditCompClick(event, item)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteCompClick(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ReadOnlyRowComp;
