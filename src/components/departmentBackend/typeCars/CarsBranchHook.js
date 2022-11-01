import React, { useState, Fragment, useEffect, useRef } from "react";
import { url } from "../../../url";
import ReadOnlyRowCar from "./ReadOnlyRowCar";
import EditableRowCar from "./EditableRowCar";
import Pagination from "../Page/Pagination";
import axios from "axios";
import "./Cars.css";
import { useSelector } from "react-redux";
import AddCar from "./AddCar";

// import BranchCompHook from "../branchCompany/BranchCompHook";
const apiCar = axios.create({ baseURL: `${url}/cars` });

const CarsBranchHook = () => {
  const stateIdCompany = useSelector((state) => state.idComp.title);
  let idCompany = 0;
  if (typeof stateIdCompany === "number") {
    idCompany = 0;
  } else {
    idCompany = stateIdCompany.title;
  }

  const [postsCar, setPostsCar] = useState([]);
  // const idCompany = 0;
  // setPostsCar(postsCar2);

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
  const carBrand = useRef(null);
  const [editPostsCarId, setEditPostsCarId] = useState(null);
  const [loadingCar, setLoadingCar] = useState(false);

  // const [unitPrice, setUnitPrice] = useState(null);

  const fetchDATA = async () => {
    const playerPic = `${url}/cars/${idCompany}`;

    console.log("conpId", playerPic);
    setPostsCar([]);

    const getCars = apiCar.get(`/${idCompany}`);

    axios.all([getCars]).then(
      axios.spread((...allData) => {
        setLoadingCar(true);
        const getCarsAll = allData[0];
        console.log("getCarsAll" + getCarsAll);
        setPostsCar(getCarsAll.data);
        setLoadingCar(false);
        // console.log(postsCar);
      })
    );
  };
  useEffect(() => {
    // if (addCompanyId !== "n") {
    fetchDATA();
    // }
  }, [idCompany]);

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

    const newCar = {
      carBrand: addFormDataCar.carBrand,
      model: addFormDataCar.model,
      carType: addFormDataCar.carType,
      productionDate: addFormDataCar.productionDate,
      color: addFormDataCar.color,
      carMileage: addFormDataCar.carMileage,
      statusRental: addFormDataCar.statusRental,
      carStatus: addFormDataCar.carStatus,
      carRentalDepartID: idCompany,
    };

    setAddFormDataCar(newCar);
    apiCar
      .post("/", newCar)
      .then((response) => {
        fetchDATA();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setAddFormDataCar("");
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
        fetchDATA();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
    console.log("delete", ...postsCar);
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

  // Get current posts
  const indexOfLastPostCar = currentPageCar * PageSize;
  const indexOfFirstPostCar = indexOfLastPostCar - PageSize;

  const currentPostsCar = postsCar.slice(
    indexOfFirstPostCar,
    indexOfLastPostCar
  );

  return (
    <div>
      <form onSubmit={handleEditFormCarSubmit}>
        <table className="tab">
          <thead className="tab--thead">
            <tr className="tab--tr">
              <th className="tab__thead--th">ID:</th>
              <th className="tab__thead--th">Producent:</th>
              <th className="tab__thead--th">Model:</th>
              <th className="tab__thead--th">Type:</th>
              <th className="tab__thead--th">Yers:</th>
              <th className="tab__thead--th">Color:</th>
              <th className="tab__thead--th">Mileages:</th>
              <th className="tab__thead--th">Status rental:</th>
              <th className="tab__thead--th">Status car:</th>
              <th className="tab__thead--th">ID company:</th>
              <th className="tab__thead--th">Actions</th>
            </tr>
          </thead>
          <tfoot className="tab--tfoot">
            <tr>
              <td colSpan="11" className="tab__tfoot--td">
                <div className="container__page--div">
                  <Pagination
                    postsPerPage={PageSize}
                    totalPosts={postsCar.length}
                    paginate={paginateCar}
                  />
                </div>
              </td>
            </tr>
          </tfoot>
          <tbody>{handleAddCars(currentPostsCar)}</tbody>
        </table>
      </form>
      <section className="container--add">
        <h2 className="container_add--h1">Add a new Cars {idCompany}</h2>
        <form className="container_add--form" onSubmit={handleAddFormCarSubmit}>
          <AddCar handleAddFormCarChange={handleAddFormCarChange} />
          <button type="submit">add</button>
        </form>
      </section>
    </div>
  );
};
export default CarsBranchHook;
