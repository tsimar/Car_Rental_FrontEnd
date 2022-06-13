import React, { useState, useEffect } from "react";
import { url } from "../../url";
import axios from "axios";
import Pagination from "../Page/Pagination";

const api = axios.create({ baseURL: `${url}/branchCompany` });
const apiUser = axios.create({ baseURL: `${url}/users` });
const apiRental = axios.create({ baseURL: `${url}/rentals` });
let addCompanyId = null;
let addUserId = null;

const RentalCar = () => {
  const [posts, setPosts] = useState([]);
  const [postsUser, setPostsUser] = useState([]);
  const [postsRental, setPostsRental] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentPageRental, setCurrentPageRental] = useState(1);
  const [PageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingRental, setLoadingRental] = useState(false);

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
    const getUser = apiUser.get(`/${addCompanyId}`);

    axios.all([getUser]).then(
      axios.spread((...allData) => {
        setLoadingUser(true);
        const getUserAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getUserAll" + getUserAll);
        setPostsUser(getUserAll.data);
        setLoadingUser(false);
      })
    );
  };
  const fetchDataRental = async () => {
    const getRental = apiRental.get(`/${addCompanyId}/${addUserId}`);

    axios.all([getRental]).then(
      axios.spread((...allData) => {
        setLoadingRental(true);
        const getRentalAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getRentalAll" + getRentalAll);
        setPostsRental(getRentalAll.data);
        setLoadingRental(false);
      })
    );
  };
  // Get current postsRental
  const indexOfLastPostRental = currentPageRental * PageSize;
  const indexOfFirstPostRental = indexOfLastPostRental - PageSize;
  const currentPostsRental = postsRental.slice(
    indexOfFirstPostRental,
    indexOfLastPostRental
  );
  // Change page
  const paginateRental = (pageNumber) => setCurrentPageRental(pageNumber);
  // Get current postsUser
  const indexOfLastPostUser = currentPageUser * PageSize;
  const indexOfFirstPostUser = indexOfLastPostUser - PageSize;
  const currentPostsUser = postsUser.slice(
    indexOfFirstPostUser,
    indexOfLastPostUser
  );
  // Change page
  const paginateUser = (pageNumber) => setCurrentPageUser(pageNumber);
  // Get current posts
  let indexOfLastPost = currentPage * PageSize;
  if (posts.length <= indexOfLastPost - PageSize) {
    indexOfLastPost = (currentPage - 1) * PageSize;
  }
  const indexOfFirstPost = indexOfLastPost - PageSize;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const addId = (id) => {
    addCompanyId = id;
  };
  const handleGetRental = (data) => {
    console.log("rental", postsRental);

    return data.map((item) => {
      return (
        <tr border={"2"} className={"user-tab"} key={item.id}>
          <td width={"47"}>{item.id}</td>
          <td width={"196"}>{item.rentalDate}</td>
          <td width={"250"}>{item.commentsRental}</td>
          <td width={"250"}>{item.commentsCustomer}</td>
          <td width={"250"}>{item.userId}</td>
        </tr>
      );
    });
  };
  const tableRental = () => {
    if (loadingRental) {
      return <h2>Loading lists rental...</h2>;
    }
    return (
      <React.Fragment>
        <h1 className="text-primary ">Rental</h1>
        <form>
          <table className={"user-main-tab"}>
            <thead>
              <tr>
                <th width={"50"}>ID:</th>
                <th width={"100"}>rental date:</th>
                <th width={"100"}>comment rental:</th>
                <th width={"100"}>comment customer:</th>
                <th width={"100"}>id user:</th>
              </tr>
            </thead>
            <tbody>{handleGetRental(currentPostsRental)}</tbody>
          </table>
        </form>
        <Pagination
          postsPerPage={PageSize}
          totalPosts={postsRental.length}
          paginate={paginateRental}
        />
      </React.Fragment>
    );
  };
  const handleGetUser = (data) => {
    console.log("user", postsUser);

    return data.map((item) => {
      return (
        <tr
          border={"2"}
          className={"user-tab"}
          key={item.id}
          onClick={(event) => handleVisibleByUserClick(event, item.id)}
        >
          <td width={"47"}>{item.id}</td>
          <td width={"196"}>{item.userName}</td>
        </tr>
      );
    });
  };
  const tableUser = () => {
    if (loadingUser) {
      return <h2>Loading users...</h2>;
    }
    return (
      <React.Fragment>
        <h1 className="text-primary ">USER</h1>
        <form>
          <table className={"user-main-tab"}>
            <thead>
              <tr>
                <th width={"50"}>ID:</th>
                <th width={"100"}>Name:</th>
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

  const handleVisibleByUserClick = (event, id) => {
    event.preventDefault();

    addUserId = id;
    // test.current.value = id;
    // company = "addCompanyId";

    fetchDataRental();
  };

  const handleVisibleByCompanyClick = (event, id) => {
    event.preventDefault();

    addCompanyId = id;
    // test.current.value = id;
    // company = "addCompanyId";
    fetchDataUser();
  };

  const renderIncomingData = (data) => {
    // if (loading) {
    //   return <h2>Loading...</h2>;
    // }
    console.log("data render in coming= ", data);
    return data.map((item) => {
      return (
        <tr
          border={"2"}
          className={"user-tab"}
          key={item.id}
          onClick={(event) => handleVisibleByCompanyClick(event, item.id)}
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

      <section className="car-tabl">
        <div>{tableUser()}</div>
      </section>
      <section className="car-tabl">
        <div>{tableRental()}</div>
      </section>
    </div>
  );
};
export default RentalCar;
