import React, { useState, Fragment, useEffect } from "react";
import ReadOnlyRowCar from "./ReadOnlyRowCar";
import EditableRowCar from "./EditableRowCar";
import Pagination from "../Page/Pagination";
import axios from "axios";
import "./Cars.css";
import { Divider } from "@material-ui/core";
const apiCar = axios.create({ baseURL: "http://localhost:8080/cars" });

const CarsBranchHook = ({ addCompanyId, postsCar }) => {
  // console.log("hello carsBranchHook", postsCar);
  const [postsCar2, setPostsCar] = useState([]);
  const [currentPageCar, setCurrentPageCar] = useState(1);
  const [PageSize] = useState(5);
  const [addFormDataCar, setAddFormDataCar] = useState({
    carBrand: "",
    model: "",
    carType: "",
    productionDate: "",
    color: "",
    carMileage: "",
    statusRental: "",
    carStatus: "",
    carRentalDepartID: "",
  });
  // setPostsCar(getAllByIdBranchComp);
  const [editFormDataCar, setEditFormDataCar] = useState({
    carBrand: "",
    model: "",
    carType: "",
    productionDate: "",
    color: "",
    carMileage: "",
    statusRental: "",
    carStatus: "",
    carRentalDepartID: "",
  });

  const [editPostsCarId, setEditPostsCarId] = useState(null);
  const [loadingCar, setLoadingCar] = useState(false);

  const [error, setError] = useState();

  // const [inEditMode, setInEditMode] = useState({
  //   status: false,
  //   rowKey: null,
  // });

  const [unitPrice, setUnitPrice] = useState(null);
  if (addCompanyId === "n") {
    return <div></div>;
  }
  // let test = useRef("");
  // const [postsCar, setPostsCar] = useState([]);

  // const fetchDATA = async () => {
  //   const playerPic = `http://localhost:8080/cars/${addCompanyId}`;

  //   console.log("conpId", playerPic);

  //   const getCars = apiCar.get(`/${addCompanyId}`);

  //   axios.all([getCars]).then(
  //     axios.spread((...allData) => {
  //       // setLoadingCar(true);
  //       const getCarsAll = allData[0];
  //       // const allDataComp = allData[1]
  //       console.log("getCarsAll" + getCarsAll);
  //       setPostsCar(getCarsAll.data);
  //       // setLoadingCar(false);
  //     })
  //   );
  // };

  // useEffect(() => {
  //   fetchDATA();
  // }, []);
  // fetchDATA();

  if (postsCar.length > 0) {
    for (let index = 0; index < postsCar.length; index++) {
      postsCar2.push(postsCar[index]);
    }
  }
  const handleAddFormCarChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormDataCar };
    newFormData[fieldName] = fieldValue;

    setAddFormDataCar(newFormData);
  };

  const handleAddFormCarSubmit = (event) => {
    event.preventDefault();
    console.log("add cars new", addFormDataCar);
    const newCar = {
      carBrand: addFormDataCar.carBrand,
      model: addFormDataCar.model,
      productionDate: addFormDataCar.productionDate,
      color: addFormDataCar.color,
      carMileage: addFormDataCar.carMileage,
      statusRental: addFormDataCar.statusRental,
      carStatus: addFormDataCar.carStatus,
      carRentalDepartID: addCompanyId,
    };
    const newCars = [...postsCar, newCar];
    console.log("newCar", newCar);

    setAddFormDataCar(newCar);
    apiCar
      .post("/", newCar)
      .then((response) => {
        // fetchDATA();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddFormDataCar("");
    handleAddCars();
  };

  const handleEditFormCarSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editPostsCarId,
      carBrand: editFormDataCar.carBrand,
      model: editFormDataCar.model,
      carType: editFormDataCar.carType,
      productionDate: editFormDataCar.productionDate,
      color: editFormDataCar.color,
      carMileage: editFormDataCar.carMileage,
      statusRental: editFormDataCar.statusRental,
      carStatus: editFormDataCar.carStatus,
      carRentalDepartID: editFormDataCar.carRentalDepartID,
    };

    apiCar
      .put(`/`, editedContact)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const newFormData = { ...postsCar };

    postsCar.map((item) => {
      if (item.id === editPostsCarId) {
        item.carBrand = editFormDataCar.carBrand;
        item.model = editFormDataCar.model;
        item.carType = editFormDataCar.carType;
        item.productionDate = editFormDataCar.productionDate;
        item.color = editFormDataCar.color;
        item.carMileage = editFormDataCar.carMileage;
        item.statusRental = editFormDataCar.statusRental;
        item.carStatus = editFormDataCar.carStatus;
        item.carRentalDepartID = editFormDataCar.carRentalDepartID;
      }
    });
    setEditPostsCarId(null);
  };

  const handleEditFormCarChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormDataCar };
    newFormData[fieldName] = fieldValue;

    setEditFormDataCar(newFormData);
    console.log("edit change");
  };

  const handleEditCarClick = (event, car) => {
    event.preventDefault();

    setEditPostsCarId(car.id);
    const formValues = {
      carBrand: car.carBrand,
      model: car.model,
      carType: car.carType,
      productionDate: car.productionDate,
      color: car.color,
      carMileage: car.carMileage,
      statusRental: car.statusRental,
      carStatus: car.carStatus,
      carRentalDepartID: car.carRentalDepartID,
    };
    setEditFormDataCar(formValues);
  };

  const handleCancelCarClick = () => {
    setEditPostsCarId(null);
  };
  const handleDeleteCarClick = (departId) => {
    const newContacts = [...postsCar];

    const index = postsCar.findIndex((contact) => contact.id === departId);

    newContacts.splice(index, 1);

    apiCar.delete(`/${departId}`);
  };

  const handleAddCars = (data) => {
    return data.map((item) => {
      return (
        <Fragment key={item.id}>
          {editPostsCarId === item.id ? (
            <EditableRowCar
              editFormDataCar={editFormDataCar}
              handleEditFormCarChange={handleEditFormCarChange}
              handleCancelCarClick={handleCancelCarClick}
              handleAddCars={handleAddCars}
            />
          ) : (
            <ReadOnlyRowCar
              loading={loadingCar}
              item={item}
              handleEditCarClick={handleEditCarClick}
              handleDeleteCarClick={handleDeleteCarClick}
              handleAddCars={handleAddCars}
            />
          )}
        </Fragment>
      );
    });
  };
  const paginateCar = (pageNumber) => setCurrentPageCar(pageNumber);
  // if (getAllByIdBranchComp.length > 0) {
  //   // setPostsCar((postsCar) => [...postsCar, getAllByIdBranchComp]);
  //   // setPostsCar((postsCar) => ({ ...getAllByIdBranchComp }));
  //   // getAllByIdBranchComp.map((item) => {
  //   //   setPostsCar(item);
  //   // });
  //   setPostsCar(...getAllByIdBranchComp);
  //   console.log("postsCar load= ", postsCar);
  //   // for (let index = 0; index < getAllByIdBranchComp.length; index++) {
  //   //   console.log("postsCar load= ", getAllByIdBranchComp[index].id);
  //   // }
  // }
  // Get current posts
  const indexOfLastPostCar = currentPageCar * PageSize;
  const indexOfFirstPostCar = indexOfLastPostCar - PageSize;
  const currentPostsCar = postsCar.slice(
    indexOfFirstPostCar,
    indexOfLastPostCar
  );

  // Change page

  if (postsCar.length == 0) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <form onSubmit={handleEditFormCarSubmit}>
        <table className="cars-table">
          <thead>
            <tr className="car-tr">
              <th className="car-th">ID:</th>
              <th>Producent:</th>
              <th>Model:</th>
              <th>Type:</th>
              <th>Yers:</th>
              <th>Color:</th>
              <th>Mileages:</th>
              <th>Status rental:</th>
              <th>Status car:</th>
              <th>ID company:</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{handleAddCars(postsCar)}</tbody>
        </table>
      </form>
      <Pagination
        //   postsPerPage={PageSize}
        totalPosts={postsCar.length}
        //   paginate={paginateCar}
      />
      <section>
        <h2>Add a new Cars {addCompanyId}</h2>
        <form onSubmit={handleAddFormCarSubmit}>
          <input
            type="text"
            name="carBrand"
            placeholder="Production"
            onChange={handleAddFormCarChange}
          />

          <button type="submit">add</button>
        </form>
      </section>
    </div>
  );
};
export default CarsBranchHook;
