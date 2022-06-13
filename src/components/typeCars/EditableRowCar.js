import React from "react";
import "./Cars.css";

const EditableRowCar = ({
  editFormDataCar,
  handleEditFormCarChange,
  handleCancelCarClick,
}) => {
  return (
    <tr className="tab--tr">
      <td className="tab--td"></td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="car Brand"
          name="carBrand"
          value={editFormDataCar.carBrand}
          onChange={handleEditFormCarChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="model"
          name="model"
          value={editFormDataCar.model}
          onChange={handleEditFormCarChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="car Type"
          name="carType"
          value={editFormDataCar.carType}
          onChange={handleEditFormCarChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="date"
          required="required"
          placeholder="production Date"
          name="productionDate"
          value={editFormDataCar.productionDate}
          onChange={handleEditFormCarChange}
        ></input>
      </td>{" "}
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="color"
          name="color"
          value={editFormDataCar.color}
          onChange={handleEditFormCarChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="car Mileage"
          name="carMileage"
          value={editFormDataCar.carMileage}
          onChange={handleEditFormCarChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="status Rental"
          name="statusRental"
          value={editFormDataCar.statusRental}
          onChange={handleEditFormCarChange}
        ></input>
      </td>
      <td className="tab--td">
        <input
          className="tab--input"
          type="text"
          required="required"
          placeholder="car Status"
          name="carStatus"
          value={editFormDataCar.carStatus}
          onChange={handleEditFormCarChange}
        ></input>
      </td>
      <td className="tab--td">
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelCarClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default EditableRowCar;
