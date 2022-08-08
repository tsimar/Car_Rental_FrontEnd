import React from "react";

const ReadOnlyRowDS = ({
  item,
  handleEditClick,
  handleDeleteClick,
  handleOnClickComp,
}) => {
  return (
    <tr
      className="tab--tr"
      key={item.id}
      onClick={(e) => handleOnClickComp(e, item.id)}
    >
      {Object.entries(item).map((key, val) => {
        return (
          <td className="tab--td" key={key[0]}>
            {key[1]}
          </td>
        );
      })}
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
export default ReadOnlyRowDS;
