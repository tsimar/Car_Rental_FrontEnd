import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Page/Pagination";
import Department from "../Department/Dapartment";
import { setComplexFieldID } from "@syncfusion/ej2-react-grids";

const api = axios.create({ baseURL: "http://localhost:8080/branchCompany" });
const apiUser = axios.create({ baseURL: "http://localhost:8080/users" });
const apiReturn = axios.create({ baseURL: "http://localhost:8080/return" });
let addCompanyId = 0;
let addUserId = null;
const ReturnCar = () => {
  const [posts, setPosts] = useState([]);
  const [postsUser, setPostsUser] = useState([]);
  const [compId, setCompId] = useState(0);
  const [postsReturn, setPostsReturn] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageUser, setCurrentPageUser] = useState(1);
  const [currentPageReturn, setCurrentPageReturn] = useState(1);
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
  console.log(addCompanyId);
  const fetchDataUser = async () => {
    const getUser = apiUser.get(`/${addCompanyId}`);

    axios.all([getUser]).then(
      axios.spread((...allData) => {
        setLoadingUser(true);
        const getUserAll = allData[0];

        console.log("getUserAll" + getUserAll);
        setPostsUser(getUserAll.data);
        setLoadingUser(false);
      })
    );
  };
  const fetchDataReturn = async () => {
    const getReturn = apiReturn.get(`/${addCompanyId}/${addUserId}`);

    axios.all([getReturn]).then(
      axios.spread((...allData) => {
        setLoadingReturn(true);
        const getReturnAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getReturnAll" + getReturnAll);
        setPostsReturn(getReturnAll.data);
        setLoadingReturn(false);
      })
    );
  };
  // Get current postsReturn
  const indexOfLastPostReturn = currentPageReturn * PageSize;
  const indexOfFirstPostReturn = indexOfLastPostReturn - PageSize;
  const currentPostsReturn = postsReturn.slice(
    indexOfFirstPostReturn,
    indexOfLastPostReturn
  );
  // Change page
  const paginateReturn = (pageNumber) => setCurrentPageReturn(pageNumber);
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
  const addId = (id) => setCompId(id);
  const handleGetReturn = (data) => {
    console.log("return", postsReturn);

    return data.map((item) => {
      return (
        <tr className="tab--tr" key={item.id}>
          <td className="tab--td">{item.id}</td>
          <td className="tab--td">{item.returnDate}</td>
          <td className="tab--td">{item.commentsReturn}</td>
          <td className="tab--td">{item.commentsCustomer}</td>
          <td className="tab--td">{item.supplement}</td>
          <td className="tab--td">{item.userId}</td>
          <td className="tab--td">{item.companyId}</td>
        </tr>
      );
    });
  };
  const tableReturn = () => {
    if (loadingReturn) {
      return <h2>Loading lists return...</h2>;
    }
    return (
      <React.Fragment>
        <h1 className="text-primary ">Return</h1>
        <form>
          <table className="tab">
            <thead className="tab--thead">
              <tr className="tab--tr">
                <th className="tab__thead--th">ID:</th>
                <th className="tab__thead--th">return date:</th>
                <th className="tab__thead--th">comment return:</th>
                <th className="tab__thead--th">comment customer:</th>
                <th className="tab__thead--th">supplement:</th>
                <th className="tab__thead--th">id user:</th>
                <th className="tab__thead--th">id company:</th>
              </tr>
            </thead>
            <tfoot className="tab--tfoot">
              <tr>
                <td colspan="11" className="tab__tfoot--td">
                  <div className="container__page--div">
                    <Pagination
                      postsPerPage={PageSize}
                      totalPosts={postsReturn.length}
                      paginate={paginateReturn}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>{handleGetReturn(currentPostsReturn)}</tbody>
          </table>
        </form>
      </React.Fragment>
    );
  };

  const handleGetUser = (data) => {
    console.log("users", postsUser);

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
          <table className="tab">
            <thead className="tab--thead">
              <tr className="tab--tr">
                <th className="tab__thead--th">ID:</th>
                <th className="tab__thead--th">Name:</th>
              </tr>
            </thead>
            <tfoot className="tab--tfoot">
              <tr>
                <td colspan="11" className="tab__tfoot--td">
                  <div className="container__page--div">
                    <Pagination
                      postsPerPage={PageSize}
                      totalPosts={postsUser.length}
                      paginate={paginateUser}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>{handleGetUser(currentPostsUser)}</tbody>
          </table>
        </form>
      </React.Fragment>
    );
  };

  const handleVisibleByUserClick = (event, id) => {
    event.preventDefault();
    addUserId = id;
    fetchDataReturn();
  };

  // const handleVisibleByCompanyClick = (event, id) => {
  //   event.preventDefault();

  //   addCompanyId = id;
  //   fetchDataUser();
  // };

  // const renderIncomingData = (data) => {
  //   console.log("data render in coming= ", data);

  //   return data.map((item) => {
  //     return (
  //       <tr
  //         className="tab--tr"
  //         key={item.id}
  //         onClick={(event) => handleVisibleByCompanyClick(event, item.id)}
  //       >
  //         <td className="tab--td">{item.id}</td>
  //         <td className="tab--td">{item.logo}</td>
  //         <td className="tab--td">{item.nameRental}</td>
  //         <td className="tab--td">{item.city}</td>
  //         <td className="tab--td">{item.address}</td>
  //       </tr>
  //     );
  //   });
  // };

  return (
    <div>
      <section className="depart">
        <div>
          <Department />
        </div>
      </section>

      <section className="car-tabl">
        <div>{tableUser()}</div>
      </section>
      <section className="car-tabl">
        <div>{tableReturn()}</div>
      </section>
    </div>
  );
};
export default ReturnCar;
