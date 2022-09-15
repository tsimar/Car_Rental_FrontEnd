import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../../url";

const apiCar = axios.create({ baseURL: `${url}/cars` });

const Cars = () => {
  const [carsPost, setCarsPost] = useState([]);
  console.log(apiCar);
  const fetchDATA = async () => {
    const getCars = await apiCar.get("/");
    console.log(getCars.data);
    setCarsPost(getCars.data);
  };

  useEffect(() => {
    fetchDATA();
  }, []);
  const handleAllCars = (data) => {
    console.log(data);

    return data.map((item, index) => {
      return (
        <div key={index}>
          <span>{item.id}</span>
          <span>{item.carBrand}</span>
          <span>{item.model}</span>
          <span>{item.carType}</span>
        </div>
      );
    });
  };
  return <div>{handleAllCars(carsPost)}</div>;
};

export default Cars;
