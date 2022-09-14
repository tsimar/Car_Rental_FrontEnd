import React, { useState } from "react";
import axios from "axios";
import { url } from "../../../url";

const apiCar = axios.create({ baseURL: `${url}/cars` });

const Cars = () => {
  const [carsPost, setCarsPost] = useState([]);

  const fetchDATA = async () => {
    setCarsPost([]);
    console.log("I am here");
    const getCars = apiCar.get();

    axios.all([getCars]).then(
      axios.spread((...allData) => {
        // setLoadingCar(true);
        const getCarsAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getCarsAll" + getCarsAll);
        setCarsPost(getCarsAll.data);
        // setLoadingCar(false);
      })
    );
  };
  return <div>{fetchDATA}</div>;
};

export default Cars;
