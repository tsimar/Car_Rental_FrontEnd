import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Page/Pagination";

const api = axios.create({ baseURL: "http://localhost:8080/branchCompany" });
const apiUser = axios.create({ baseURL: "http://localhost:8080/users" });
// const apiReturn = axios.create({ baseURL: "http://localhost:8080/rentals" });

let addCompanyId = null;

const ReturnCar = () => {
  const [posts, setPosts] = useState([]);
  const [postsUser, setPostsUser] = useState([]);
  
 
  const [postsReturn, setPostsReturn] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
     const [currentPageUser, setCurrentPageUser] = useState(1);
  const [PageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingReturn, setLoadingReturn] = useState(false);

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

  const fetchDataUser = async () => {
    const getRental = apiUser.get(`/${addCompanyId}`);

    axios.all([getRental]).then(
      axios.spread((...allData) => {
        setLoadingUser(true);
        const getRentalAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getUsersAll" + getRentalAll);
        setPostsUser(getRentalAll.data);
        setLoadingUser(false);
      })
    );
  };
  const fetchDataReturn = async () => {
    const getUsers = apiUser.get(`/${addCompanyId}`);

    axios.all([getUsers]).then(
      axios.spread((...allData) => {
        setLoadingUser(true);
        const getUsersAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getUsersAll" + getUsersAll);
        setPostsUser(getUsersAll.data);
        setLoadingUser(false);
      })
    );
  };

  // Get current posts
  const indexOfLastPostUser = currentPageUser * PageSize;
  const indexOfFirstPostUser = indexOfLastPostUser - PageSize;
  const currentPostsUser = postsUser.slice(
    indexOfFirstPostUser,
    indexOfLastPostUser
  );
  // Change page
  const paginateUser = (pageNumber) => setCurrentPageUser(pageNumber);


let indexOfLastPost = currentPage * PageSize;
if (posts.length <= indexOfLastPost - PageSize) {
  indexOfLastPost = (currentPage - 1) * PageSize;
}
const indexOfFirstPost = indexOfLastPost - PageSize;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
const paginate = (pageNumber) => setCurrentPage(pageNumber);



  const handleGetUser = (data) => {
    console.log("cars", postsUser);

    return data.map((item) => {
      return (
        <tr border={"2"} className={"user-tab"} key={item.id}>
          <td width={"47"}>{item.id}</td>
          <td width={"196"}>{item.userName}</td>
          <td width={"250"}>{item.userPassword}</td>
          <td width={"200"}>{item.customer}</td>
        </tr>
      );
    });
  };
  const tableUser = () => {

    return (
      <React.Fragment>
        <form>
          <table className={"user-main-tab"}>
            <thead>
              <tr>
                <th width={"50"}>ID:</th>
                <th width={"100"}>Company:</th>
                <th width={"100"}>city:</th>
                <th width={"100"}>idEmployee:</th>
                <th width={"50"}>nameEmployee :</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{handleGetUser(currentPostsUser)}</tbody>
          </table>
        </form>
        <Pagination
          postsPerPage={PageSize}
          totalPosts={postsUser.length}
          paginate={paginateUser}
        />
      </React.Fragment>
    );
  };





  const handleVisibleCompClick = (event, id) => {
    event.preventDefault();

    addCompanyId = id;
    // test.current.value = id;
    // company = "addCompanyId";
    fetchDataUser();
    fetchDataReturn();
  };

  const renderIncomingData = (data) => {
    console.log("data render in coming= ", data);

    return data.map((item) => {
      return (
        <tr
          border={"2"}
          className={"user-tab"}
          key={item.id}
          onClick={(event) => handleVisibleCompClick(event, item.id)}
        >
          <td width={"auto"}>{item.id}</td>
          <td width={"auto"}>{item.logo}</td>
          <td width={"auto"}>{item.nameRental}</td>
          <td width={"auto"}>{item.city}</td>
          <td width={"auto"}>{item.address}</td>
        </tr>
      );
    });
  };

  return (
    <div>
      <div className="h1-tabl-page">
        <h1 className="text-primary ">DEPARTMENT</h1>

        <div className="form-table-comp">
          <form>
            <table className={"comp-main-tab"}>
              <thead>
                <tr>
                  <th width={"auto"}>ID:</th>
                  <th width={"auto"}>Logo:</th>
                  <th width={"auto"}>department:</th>
                  <th width={"auto"}>city:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{renderIncomingData(currentPosts)}</tbody>
            </table>
          </form>
        </div>
        <div className="position-page">
          <Pagination
            postsPerPage={PageSize}
            totalPosts={posts.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
};
export default ReturnCar;
