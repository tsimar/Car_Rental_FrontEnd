import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  ChatAPI,
  useCallback,
  useDebugValue,
} from "react";
import axios from "axios";
import { nanoid } from "nanoid";
// import './Cars.css';
// import { render } from "react-dom";
// import BranchCompanyPost from "./BranchCompanyPost";
import BranchCompanyPage from "./BranchCompanyPage";
import ReadOnlyRowD from "./ReadOnlyRowD";
import EditableRowD from "./EditableRowD";
import ReadOnlyRowCar from "../cars/ReadOnlyRowCar";
import EditableRowCar from "../cars/EditableRowCar";

import { render } from "react-dom";
// import Cars from "./Cars";

const api = axios.create({ baseURL: "http://localhost:8080/branchCompany" });
const apiCar = axios.create({ baseURL: "http://localhost:8080/cars" });
// axios.defaults.headers.post["Content-Type"] = "application/json";
let addCompanyId = null;
const BranchCompHook = () => {
  console.log("REEEEEEEEEE_Branch");
  const [posts, setPosts] = useState([]);
  const [editPostsId, setEditPostsId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addFormData, setAddFormData] = useState({
    logo: "",
    nameRental: "",
    city: "",
    address: "",
  });

  const [editFormData, setEditFormData] = useState({
    logo: "",
    nameRental: "",
    city: "",
    address: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  // CONST FROM CAR

  let test = useRef("");

  const [postsCar, setPostsCar] = useState([]);
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


  const [editPostsCarId, setEditPostsCarId] = useState(null);
  const [loadingCar, setLoadingCar] = useState(false);
  const [p, setP] = useState();
  //   const [error, setError] = useState();

  //   const [inEditMode, setInEditMode] = useState({
  //     status: false,
  //     rowKey: null,
  //   });

  //   const [unitPrice, setUnitPrice] = useState(null);

  const fetchDATA = async () => {
    const playerPic = `http://localhost:8080/cars/${addCompanyId}`;

    console.log("conpId", playerPic);

    const getCars = apiCar.get(`/${addCompanyId}`);

    axios.all([getCars]).then(
      axios.spread((...allData) => {
        setLoadingCar(true);
        const getCarsAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getCarsAll" + getCarsAll);
        setPostsCar(getCarsAll.data);
        setLoadingCar(false);
      })
    );
  };
  const fetchDATAPost = async () => {
    const playerPic = `http://localhost:8080/cars/${addCompanyId}`;

    console.log("conpId", playerPic);
    test.current.value = addCompanyId;
    setEditPostsCarId(addCompanyId);
    console.log("test", test.current.value);
    console.log("setEditPostsCarId", editPostsCarId);
    const getCars = apiCar.post(`/`);

    axios.all([getCars]).then(
      axios.spread((...allData) => {
        setLoadingCar(true);
        const getCarsAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getCarsAll" + getCarsAll);

        setPostsCar(getCarsAll.data);
        setLoadingCar(false);
      })
    );
  };
  //   useEffect(() => {
  //     // fetchDATA();
  //   }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await api.get("/");
    setPosts(res.data);
    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const editedContact = {
      id: editPostsId,
      logo: editFormData.logo,
      nameRental: editFormData.nameRental,
      city: editFormData.city,
      address: editFormData.address,
    };

    api
      .put(`/`, editedContact)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const newFormData = { ...posts };

    posts.map((item) => {
      if (item.id === editPostsId) {
        item.logo = editedContact.logo;
        item.nameRental = editedContact.nameRental;
        item.city = editedContact.city;
        item.address = editedContact.address;
      }
    });
    setEditPostsId(null);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, company) => {
    event.preventDefault();
    setEditPostsId(company.id);
    const formValues = {
      logo: company.logo,
      nameRental: company.nameRental,
      city: company.city,
      address: company.address,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditPostsId(null);
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newComp = {
      id: nanoid(),
      logo: addFormData.logo,
      nameRental: addFormData.nameRental,
      city: addFormData.city,
      address: addFormData.address,
    };
    const newComps = [...posts, newComp];

    api
      .post("/", addFormData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetchMyData();
  };

  // WORK FROM CAR



  const handleAddFormCarChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormDataCar };
    newFormData[fieldName] = fieldValue;

    setAddFormDataCar(newFormData);
  };
  const textInput = useRef("");

  const handleAddFormCarSubmit = (event) => {
    event.preventDefault();

    // alert({ ...editPostsCarId.data });
    const newCar = {
      //   id: nanoid(),
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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // textInput.current.value='';
    setAddFormDataCar("");
    tableCars();
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
      item.carBrand= editFormDataCar.carBrand;
    item.model= editFormDataCar.model;
    item.carType= editFormDataCar.carType;
   item. productionDate= editFormDataCar.productionDate;
    item.color= editFormDataCar.color;
    item.carMileage= editFormDataCar.carMileage;
   item.statusRental= editFormDataCar.statusRental;
    item.carStatus= editFormDataCar.carStatus;
    item.carRentalDepartID= editFormDataCar.carRentalDepartID;
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
  console.log('edit change')
};

const handleEditCarClick = (event, car) => {
  event.preventDefault();
  console.log('click edit')
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

  setPostsCar(newContacts);
  apiCar.delete(`/${departId}`);
  // this.getUsers(data);
};
  const handleVisibleCarsClick = (event, id) => {
    event.preventDefault();

    addCompanyId = id;
    // test.current.value = id;
    // company = "addCompanyId";
    fetchDATA();
  };

  const handleAddCars = () => {
    console.log("cars", postsCar);

    return postsCar.map((item) => {
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
          {/*  */}
        </Fragment>
      );
    });

    // fetchMyData();

    return;
  };

  const tableCars = () => {
    // if (loadingCar) {
    //   return <h2>Loading...</h2>;
    // }
    return (
      <React.Fragment>
        <form onSubmit={(handleVisibleCarsClick, handleEditFormCarSubmit)}>
          <table className={"user-main-tab"}>
            <thead>
              <tr>
                <th width={"50"}>ID:</th>
                <th width={"200"}>Producent:</th>
                <th width={"100"}>Model:</th>
                <th width={"100"}>Type:</th>
                <th width={"50"}>Yers:</th>
                <th width={"50"}>Color:</th>
                <th width={"100"}>Mileages:</th>
                <th width={"100"}>Status rental:</th>
                <th width={"200"}>Status car:</th>
                <th width={"50"}>ID company:</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{handleAddCars()}</tbody>
          </table>
        </form>
        <section className="add">
          <form onSubmit={handleAddFormCarSubmit} className={"table_add"}>
            <h2 className={"text_add"}>Add a new Cars {addCompanyId}</h2>
            <input
              type="text"
              name="carBrand"
              // ref={textInput}
              placeholder="Production"
              // required="required"
              // ref={ref=>test=ref}
              onChange={handleAddFormCarChange}
            />
            <input
              type="text"
              name="model"
              // required="required"

              placeholder="model ..."
              onChange={handleAddFormCarChange}
            />
            <input
              type="text"
              name="productionDate"
              // required="required"

              placeholder="Yers  ..."
              onChange={handleAddFormCarChange}
            />
            <label htmlFor={test}>address </label>
            <input
              type="text"
              name="color"
              // required="required"
              value={addFormDataCar.color}
              // ref={test}
              placeholder="color  ..."
              onChange={handleAddFormCarChange}
            />{" "}
            <button type="submit">add</button>
            {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
          </form>
        </section>
      </React.Fragment>
    );
  };

  const renderIncomingData = (data) => {
    // if (loading) {
    //   return <h2>Loading...</h2>;
    // }

    return data.map((item) => {
      return (
        <Fragment key={item.id}>
          {editPostsId === item.id ? (
            <EditableRowD
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              handleVisibleCarsClick={handleVisibleCarsClick}
            />
          ) : (
            <ReadOnlyRowD
              item={item}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              handleVisibleCarsClick={handleVisibleCarsClick}
            />
          )}
          {/*  */}
        </Fragment>
      );
    });
  };
  const handleDeleteClick = (departId) => {
    const newContacts = [...posts];

    const index = posts.findIndex((contact) => contact.id === departId);

    newContacts.splice(index, 1);

    setPosts(newContacts);
    api.delete(`/${departId}`);
    // this.getUsers(data);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <h1 className="text-primary mb-3">Flota</h1>

      <div>
        <form onSubmit={handleEditFormSubmit}>
          <table className={"user-main-tab"}>
            <thead>
              <tr>
                <th width={"50"}>ID:</th>
                <th width={"200"}>Logo:</th>
                <th width={"250"}>Name's department:</th>
                <th width={"200"}>city:</th>
                <th width={"200"}>address:</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{renderIncomingData(currentPosts)}</tbody>
          </table>
        </form>
      </div>
      <BranchCompanyPage
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
      <div>{tableCars()}</div>

      {/* {renderIncomingData()} */}
      <div className="add">
        <h2 className={"text_add"}>Add a new DEPARTMENT</h2>
        <form onSubmit={handleAddFormSubmit} className={"table_add"}>
          <div>
            <input
              type="text"
              name="logo"
              placeholder="logo department"
              required="required"
              onChange={handleAddFormChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="nameRental"
              // required="required"
              placeholder="name department ..."
              onChange={handleAddFormChange}
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              // required="required"

              placeholder="city  ..."
              onChange={handleAddFormChange}
            />
          </div>
          <div>
            <label htmlFor="address">address</label>
            <input
              type="text"
              name="address"
              // required="required"

              placeholder="address  ..."
              onChange={handleAddFormChange}
            />{" "}
          </div>

          <button type="submit">add</button>

          {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
        </form>
      </div>
    </React.Fragment>
  );
};

export default BranchCompHook;
