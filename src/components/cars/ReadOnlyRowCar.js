import React from "react";
import { format } from "date-fns";
import "../user/User.css";

import moment from "moment";

const ReadOnlyRowCar = ({
  item,
  handleEditCarClick,
  handleDeleteCarClick,
  loading,
}) => {
let date =item.productionDate;
console.log("date", moment(date).format("Do MMMM  YYYY"));
  // if (loading) {
  //   return <h2>Loading...</h2>;
  // }
  return (
    <tr border={"2"} className={"user-tab"} key={item.id}>
      <td width={"50"}>{item.id}</td>
      <td width={"100"}>{item.carBrand}</td>
      <td width={"100"}>{item.model}</td>
      <td width={"100"}>{item.carType}</td>
      <td width={"50"}>{ moment(date).format("MM YYYY")}</td>
      <td width={"50"}>{item.color}</td>
      <td width={"100"}>{item.carMileage}</td>
      <td width={"100"}>{item.statusRental}</td>
      <td width={"100"}>{item.carStatus}</td>
      <td width={"50"}>{item.carRentalDepartID}</td>
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
