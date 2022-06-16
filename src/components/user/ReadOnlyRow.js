import React from "react";
import "./User.css";

const ReadOnlyRow = ({
  item,
  handleEditClick,
  handleDeleteClick,
  handleVisibleCompClick,
}) => {
  return (
    <tr
      border={"2"}
      className="tab--tr"
      key={item.id}
      onClick={(event) => handleVisibleCompClick(event, item.id)}
    >
      <td className="tab--td">{item.id}</td>
      <td className="tab--td">{item.userName}</td>
      <td className="tab--td">{item.userPassword}</td>
      <td className="tab--td">{item.customer}</td>
      <td className="tab--td">
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
export default ReadOnlyRow;
