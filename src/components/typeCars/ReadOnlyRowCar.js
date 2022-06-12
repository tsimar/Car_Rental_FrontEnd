import React from "react";
import { format } from "date-fns";
import "./Cars.css";

import moment from "moment";

const ReadOnlyRowCar = ({
  item,
  handleEditCarClick,
  handleDeleteCarClick,
  loading,
}) => {
  let date = item.productionDate;
  // console.log("date", moment(date).format("Do MMMM  YYYY"));
  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }
  return (
    <tr className="tab--tr" key={item.id}>
      <td className="tab--td">{item.id}</td>
      <td className="tab--td">{item.carBrand}</td>
      <td className="tab--td">{item.model}</td>
      <td className="tab--td">{item.carType}</td>
      <td className="tab--td">{moment(date).format("MM YYYY")}</td>
      <td className="tab--td">{item.color}</td>
      <td className="tab--td">{item.carMileage}</td>
      <td className="tab--td">{item.statusRental}</td>
      <td className="tab--td">{item.carStatus}</td>
      <td className="tab--td">{item.carRentalDepartID}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditCarClick(event, item)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteCarClick(item.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};
export default ReadOnlyRowCar;
