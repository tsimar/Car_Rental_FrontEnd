import React from "react";
import "../../../style/table.css";

const ReadOnlyRowEmpl = ({
  item,
  handleEditEmplClick,
  handleDeleteEmplClick,
}) => {
  return (
    <tr className="tab--tr" key={item.id}>
      <td className="tab--td">{item.id}</td>
      <td className="tab--td">{item.name}</td>
      <td className="tab--td">{item.lastName}</td>
      <td className="tab--td">{item.position}</td>
      <td className="tab--td">{item.carRentalDepartID}</td>
      <td className="tab--td">
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
};
export default ReadOnlyRowEmpl;
