import React from "react";

const AddCar = ({ handleAddFormCarChange }) => {
  return (
    <div>
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="carBrand"
        placeholder="Production..."
        onChange={handleAddFormCarChange}
      />
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="model"
        placeholder="Model..."
        onChange={handleAddFormCarChange}
      />
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="carType"
        placeholder="type..."
        onChange={handleAddFormCarChange}
      />
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="productionDate"
        placeholder="date..."
        onChange={handleAddFormCarChange}
      />
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="color"
        placeholder="color..."
        onChange={handleAddFormCarChange}
      />
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="carMileage"
        placeholder="mileage..."
        onChange={handleAddFormCarChange}
      />
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="statusRental"
        placeholder="status rental..."
        onChange={handleAddFormCarChange}
      />
      <input
        className="container_add--input"
        // ref={carBrand}
        type="text"
        name="carStatus"
        placeholder="status car..."
        onChange={handleAddFormCarChange}
      />
    </div>
  );
};

export default AddCar;
