import React, {
  Component,
  setState,
  useState,
  useEffect,
  useRef,
  useCallback,
  Fragment,
} from "react";
import { url } from "../../url";
import { nanoid } from "nanoid";
import axios from "axios";

import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
// import ReadOnlyRowComp from "./ReadOnlyRowComp";
// import EditableRowComp from "./EditableRowComp";
// import ReturnCar from "../returnCar/ReturnCar";
import Pagination from "../Page/Pagination";
import RrTest from "../returnCar/RrTest"
import "../style/reset.css";
import "../style/table.css";
import "../style/inputAdd.css";
import "./User.css";

const apiReturn = axios.create({ baseURL: `${url}/return` });
const apiUser = axios.create({ baseURL: `${url}/users` });
let addUserId = 1;

const Customer = (addCompanyId) => {

  const [userPosts, setUserPosts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    userName: "",
    userPassword: "",
  });
  const [editFormData, setEditFormData] = useState({
    editId: "",
    userName: "",
    userPassword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize] = useState(5);
  const [loading, setLoading] = useState(false);
  const [editContactId, setEditContactId] = useState(null);

  // company
  const [loadingUserComp, setLoadingUserComp] = useState(1);
  const [postsUserComp, setPostsUserComp] = useState([]);
  const [currentPageComp, setCurrentPageComp] = useState(1);
  const [editCompId, setEditCompId] = useState(null);
  const [userId, setUserId] = useState(0);
  const userItem = useRef(null);
  let idCompany = Object.values(addCompanyId)[0];
  const [postsReturn, setPostsReturn] = useState([]);

  const fetchDataReturn = async () => {
    const getReturn = await apiReturn.get(`/${addCompanyId}/${addUserId}`);

    // axios.all([getReturn]).then(
    //   axios.spread((...allData) => {
    //     // setLoadingReturn(true);
    //     const getReturnAll = allData[0];
    //     console.log("getReturnAll" + getReturnAll);
    setPostsReturn(getReturn.data);
    console.log(getReturn.data);
    // setLoadingReturn(false);
    // })
    // );
  };
  const fetchPosts = async () => {
    setLoading(true);
    const res = await apiUser.get(`/${idCompany}`);
    setUserPosts(res.data);
    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    if (idCompany !== 0) {
      fetchPosts();
    }
  }, [addCompanyId]);

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
    const newUser = {
      // id: nanoid(),
      userName: addFormData.userName,
      userPassword: addFormData.userPassword,
    };
    const newUsers = [...userPosts, newUser];

    apiUser
      .post("/", newUser)
      .then((response) => {
        fetchPosts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // setUserPosts(newUsers);
    setAddFormData("");
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      userName: editFormData.userName,
      userPassword: editFormData.userPassword,
    };

    apiUser
      .put(`/`, editedContact)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    const newFormData = { ...userPosts };
    userPosts.map((item) => {
      if (item.id === editContactId) {
        item.userName = editFormData.userName;
        item.userPassword = editFormData.userPassword;
      }
    });
    setEditContactId(null);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditContactId(user.id);

    const formValues = {
      editId: user.id,
      userName: user.userName,
      userPassword: user.userPassword,
    };
    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (userId) => {
    const newContacts = [...userPosts];

    const index = userPosts.findIndex((contact) => contact.id === userId);

    newContacts.splice(index, 1);

    setUserPosts(newContacts);
    apiUser.delete(`/${userId}`);
  };
  const handleVisibleUserClick = (event, id) => {
    event.preventDefault();

    setUserId(id);
  };

  // Get current posts
  let indexOfLastPost = currentPage * PageSize;
  if (userPosts.length <= indexOfLastPost - PageSize) {
    indexOfLastPost = Math.ceil(userPosts.length / PageSize) * PageSize;
  }
  const indexOfFirstPost = indexOfLastPost - PageSize;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderIncomingData = (data) => {
    return data.map((item) => {
      return (
        <Fragment key={item.id}>
          {editContactId === item.id ? (
            <EditableRow
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
              // handleVisibleByCompany={handleVisibleCarsClick}
            />
          ) : (
            <ReadOnlyRow
              item={item}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              handleVisibleUserClick={handleVisibleUserClick}
            />
          )}
        </Fragment>
      );
    });
  };
  return (
    <div>
      <div>
        <form onSubmit={handleEditFormSubmit}>
          <table className="tab">
            <thead className="tab--thead">
              <tr className="tab--tr">
                <th className="tab__thead--th">ID:</th>
                <th className="tab__thead--th">Imię:</th>
                <th className="tab__thead--th">Hasło:</th>
                <th className="tab__thead--th">Rola:</th>
                <th className="tab__thead--th">Actions</th>
              </tr>
            </thead>
            <tfoot className="tab--tfoot">
              <tr>
                <td colspan="6" className="tab__tfoot--td">
                  <div className="container__page--div">
                    <Pagination
                      postsPerPage={PageSize}
                      totalPosts={userPosts.length}
                      paginate={paginate}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>{renderIncomingData(currentPosts)}</tbody>
          </table>
        </form>
      </div>
      <section className="container--add">
        <h2 className="container_add--h1">Add a new users</h2>
        <form onSubmit={handleAddFormSubmit} className="container_add--form">
          <input
            className="tab--input"
            type="text"
            name="userName"
            placeholder="login or email"
            required="required"
            onChange={handleAddFormChange}
          />

          <input
            className="tab--input"
            type="text"
            name="userPassword"
            required="required"
            placeholder="Enter a password ..."
            onChange={handleAddFormChange}
          />
          <button type="submit">add</button>
          {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
        </form>
      </section>
      <section className="section-car">
        <RrTest addCompanyId={idCompany} addUserId={ userId} />
      </section>
    </div>
  );
};

export default Customer;
