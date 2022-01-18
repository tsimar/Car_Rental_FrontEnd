import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import "./Cars.css";
import { render } from "react-dom";
import CarsHugPost from "./CarsHugPost";
import CarsHugPage from "./CarsHugPage";
import ReadOnlyRowCar from "../cars/ReadOnlyRowCar";
import EditableRowCar from "../cars/EditableRowCar";
// import { render } from "react-dom";
// import Cars from "./Cars";
// axios.defaults.headers.common['Authorization'] = "http://localhost:8080/cars";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// const api = axios.create({
//     baseURL: 'http://localhost:8080/cars', timeout: 1000,
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Access-Control-*': '*'
//     }
// });

const CarsHug = (addConpanyId) => {
  console.log("Cars");
  const [postsCar, setPostsCar] = useState([]);
//   let addConpanyId = null;
  const [loadingCar, setLoadingCar] = useState(false);
  const [editPostsId, setEditPostsId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  if (loadingCar) {
    return <h2>Loading...</h2>;
  }

  const fetchDATA = async () => {
    const playerPic = `http://localhost:8080/cars/${addConpanyId}`;

    console.log("conpId", playerPic);

    const getComp = axios.get(playerPic);
    const getCars = axios.get(playerPic);

    axios.all([getCars, getComp]).then(
      axios.spread((...allData) => {
        setLoadingCar(true);
        const getCarsAll = allData[0];
        const allDataComp = allData[1];
        console.log("getCarsAll" + getCarsAll);
        setPostsCar(getCarsAll.data);
        setLoadingCar(false);
      })
    );
  };
  const handleVisibleCarsClick = (event, id) => {
    event.preventDefault();

    addConpanyId = id;

    fetchDATA();
    addConpanyId = null;
  };
  const handleAddCars = () => {
    console.log("cars", postsCar);

    return postsCar.map((item) => {
      return (
        <Fragment key={item.id}>
          {editPostsId === item.id ? (
            <EditableRowCar
            //   editFormData={editFormData}
            //   handleEditFormChange={handleEditFormChange}
            //   handleCancelClick={handleCancelClick}
            //   handleAddCars={handleAddCars}
            />
          ) : (
            <ReadOnlyRowCar
            //   item={item}
            //   handleEditClick={handleEditClick}
            //   handleDeleteClick={handleDeleteClick}
            //   handleAddCars={handleAddCars}
            />
          )}
        </Fragment>
      );
    });

    // fetchMyData();
  };
  //   setPosts(postsCar);
  if (!postsCar) return null;
  // Get current posts
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <React.Fragment>
      <h1 className="text-primary mb-3">CARS</h1>

      <form onSubmit={handleVisibleCarsClick}>
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
              <th width={"150"}>Status rental:</th>
              <th width={"100"}>Status car:</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{handleAddCars()}</tbody>
        </table>
      </form>
    </React.Fragment>
  );
};

export default CarsHug

