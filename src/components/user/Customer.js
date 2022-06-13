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
import "./User.css";
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";
import ReadOnlyRowComp from "./ReadOnlyRowComp";
import EditableRowComp from "./EditableRowComp";
import Pagination from "../Page/Pagination";

const apiUser = axios.create({ baseURL: `${url}/users` });

const Customer = () => {
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
  let userId = null;

  // company
  const [loadingUserComp, setLoadingUserComp] = useState(1);
  const [postsUserComp, setPostsUserComp] = useState([]);
  const [currentPageComp, setCurrentPageComp] = useState(1);
  const [editCompId, setEditCompId] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await apiUser.get("/");
    setUserPosts(res.data);
    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setUserPosts(newUsers);
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
    // this.getUsers(data);
  };
  const handleVisibleCompClick = (event, id) => {
    event.preventDefault();
    console.log("visible user", id);
    userId = id;
  };

  // Get current posts
  const indexOfLastPost = currentPage * PageSize;
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
              handleVisibleCompClick={handleVisibleCompClick}
            />
          )}
        </Fragment>
      );
    });
  };
  //User => Company

  const handleAddCompFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };

  const handleAddCompFormSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      // id: nanoid(),
      userName: addFormData.userName,
      userPassword: addFormData.userPassword,
    };
    const newUsers = [...postsUserComp, newUser];

    apiUser
      .post("/", newUser)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setPostsUserComp(newUsers);
    setAddFormData("");
  };

  const handleEditCompFormSubmit = (event) => {
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

  const handleEditCompFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleEditCompClick = (event, user) => {
    event.preventDefault();
    setEditContactId(user.id);

    const formValues = {
      editId: user.id,
      userName: user.userName,
      userPassword: user.userPassword,
    };
    setEditFormData(formValues);
  };

  const handleCancelCompClick = () => {
    setEditCompId(null);
  };

  const handleDeleteCompClick = (userId) => {
    const newContacts = [...postsUserComp];

    const index = postsUserComp.findIndex((contact) => contact.id === userId);

    newContacts.splice(index, 1);

    setPostsUserComp(newContacts);
    apiUser.delete(`/${userId}`);
  };
  // Get current posts
  const indexOfLastPostComp = currentPage * PageSize;
  const indexOfFirstPostComp = indexOfLastPostComp - PageSize;
  const currentPostsCompany = postsUserComp.slice(
    indexOfFirstPostComp,
    indexOfLastPostComp
  );

  // Change page
  const paginateComp = (pageNumber) => setCurrentPageComp(pageNumber);

  const renderIncomingDataComp = (data) => {
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
            />
          )}
        </Fragment>
      );
    });
  };
  const tableComp = () => {
    if (loadingUserComp) {
      return <h2>Loading data from company...</h2>;
    }
    return (
      <section className="empl-tab">
        <h1> Employee</h1>
        <form onSubmit={handleEditCompFormSubmit}>
          <table className={"comp-main-tab"}>
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
            <tbody>{renderIncomingDataComp(currentPostsCompany)}</tbody>
          </table>
        </form>
        <Pagination
          postsPerPage={PageSize}
          totalPosts={postsUserComp.length}
          paginate={paginateComp}
        />
        <section className="add-empl">
          <form onSubmit={handleAddCompFormSubmit}>
            <h2 className={"text_add"}>Add a new employee {userId}</h2>
            <input
              type="text"
              name="name"
              // ref={textInput}
              placeholder="name ..."
              // required="required"
              // ref={ref=>test=ref}
              onChange={handleAddCompFormChange}
            />
            <input
              type="text"
              name="lastName"
              // required="required"

              placeholder="last name ..."
              onChange={handleAddCompFormChange}
            />
            <input
              type="text"
              name="position"
              // required="required"

              placeholder="position  ..."
              onChange={handleAddCompFormChange}
            />
            <button type="submit">add</button>
            {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
          </form>
        </section>
      </section>
    );
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
                    {/* <Pagination
                      postsPerPage={PageSize}
                      totalPosts={posts.length}
                      paginate={paginate}
                    /> */}
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>{renderIncomingData(currentPosts)}</tbody>
          </table>
        </form>
      </div>
      <h2 className={"user-main-tab"}>Add a new users</h2>
      <form onSubmit={handleAddFormSubmit} className={"user-label"}>
        <input
          type="text"
          name="userName"
          placeholder="login or email"
          required="required"
          onChange={handleAddFormChange}
        />

        <input
          type="text"
          name="userPassword"
          required="required"
          placeholder="Enter a password ..."
          onChange={handleAddFormChange}
        />
        <button type="submit">add</button>
        {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
      </form>
      <section className="car-tabl">
        <div>{tableComp()}</div>
      </section>
      {/* <button className={'user-label'} type="submit" onClick={this.Customer()}>gtregd</button> */}
    </div>
  );
};

export default Customer;
