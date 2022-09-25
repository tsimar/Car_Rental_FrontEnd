import React, { useState, useEffect, Fragment } from "react";
import { url } from "../../../url";
import axios from "axios";

import InfoCustomer from "./InfoCustomer";
import ReadOnlyRow from "./ReadOnlyRowUser";
import EditableRow from "./EditTableRowUser";
import ReturnCar from "../returnCar/ReturnCar";
import RentalCar from "../rentalCar/RentalCar";
import Pagination from "../Page/Pagination";
import { useSelector } from "react-redux";

import "../../../style/reset.css";
import "../../../style/table.css";
import "../../../style/inputAdd.css";
import "./User.css";

const apiUser = axios.create({ baseURL: `${url}/users` });

const Customer = ({ returnCar }) => {
  const stateIdCompany = useSelector((state) => state.idComp.title);
  let idCompany = 0;
  if (typeof stateIdCompany === "number") {
    idCompany = 0;
  } else {
    idCompany = stateIdCompany.title;
  }
  console.log(typeof idCompany);

  const [userPosts, setUserPosts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    idComp: "",
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
  console.log(loading);
  const [editContactId, setEditContactId] = useState(null);
  const [userId, setUserId] = useState(0);
  // const logoRef = useRef(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await apiUser.get(`/${idCompany}`);
      console.log(res.data);
      setUserPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // if (typeof idCompany !== undefined && idCompany !== 0) {
    setUserId(0);
    fetchPosts();
    // }
  }, [idCompany]);

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
      departmentId: idCompany,
      userName: addFormData.userName,
      userPassword: addFormData.userPassword,
    };

    apiUser
      .post("/", newUser)
      .then((response) => {
        fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
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
        fetchPosts();
      })
      .catch((error) => {
        console.log(error);
      });
    // const newFormData = { ...userPosts };
    userPosts.map((item) =>
      item.id === editContactId
        ? (item.userName = editFormData.userName)
        : (item.userPassword = editFormData.userPassword)
    );
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
    console.log(user.id);
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

  const selectReturnOrRentalOrCustomer = (userId) => {
    switch (returnCar) {
      case "Return": {
        return <ReturnCar addUserId={userId} />;
      }
      case "Customer": {
        return <InfoCustomer addUserId={userId} />;
      }
      case "Rental": {
        return <RentalCar addUserId={userId} />;
      }
      default:
        return <RentalCar addUserId={userId} />;
    }
  };
  return (
    <div className="tabl-comp">
      <h1 className="text-primary ">Users{idCompany.title}</h1>
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
                <td colSpan="6" className="tab__tfoot--td">
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
        </form>
      </section>
      <section className="section-car">
        {selectReturnOrRentalOrCustomer(userId)}
      </section>
    </div>
  );
};

export default Customer;
