import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../../url";
import { useSelector } from "react-redux";
import car from "../../../jpeg/favicon.png";
import "./cars.css";

const apiCar = axios.create({ baseURL: `${url}/cars` });

const Cars = () => {
  const [carsPost, setCarsPost] = useState([]);
  const idCompany = useSelector((state) => state.idComp.title);
  let depId = 0;
  if (idCompany.title !== undefined) {
    depId = idCompany.title;
  } else {
    depId = 0;
  }

  useEffect(() => {
    async function fetchDATA() {
      const getCars = await apiCar.get(`/${depId}`);
      console.log("dataCars", getCars.data);
      setCarsPost(getCars.data);
    }
    fetchDATA();
  }, [idCompany.title, depId]);

  const handleAllCars = (data) => {
    console.log(data);
    if (data.length <= 0) {
      return (
        <div>
          <p>
            sorry, there are no cars at the moment, try in a different
            department{" "}
          </p>
        </div>
      );
    } else {
      return data.map((item, index) => {
        return (
          <div className="wrrop-car-div" key={index}>
            <div>
              <img src={car} alt="" />
            </div>
            <div className="wrrop_div-item--car">
              <span>{item.id}</span>
              <span>{item.carBrand}</span>
              <span>{item.model}</span>
              <span>{item.carType}</span>
              <span>{depId}</span>
            </div>
          </div>
        );
      });
    }
  };
  return <div>{handleAllCars(carsPost)}</div>;
};

export default Cars;
