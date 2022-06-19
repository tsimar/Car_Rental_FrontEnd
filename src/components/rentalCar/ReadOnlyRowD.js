import React from "react";

const ReadOnlyRowD = ({
  item,
  handleEditClick,
  handleDeleteClick,
  handleVisibleCarsClick,
}) => {
  return (
    <tr
      className="tab--tr"
      key={item.id}
      onClick={(event) => {
        handleVisibleCarsClick(event, item.id);
      }}
    >
      <td className="tab--td">{item.id}</td>
      <td className="tab--td">{item.logo}</td>
      <td type="mult" className="tab--td">
        {item.nameRental}
      </td>
      <td className="tab--td"> {item.city}</td>
      <td className="tab--td">{item.address}</td>
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
