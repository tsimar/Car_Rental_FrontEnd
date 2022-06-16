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
import ReadOnlyRowComp from "./ReadOnlyRowComp";
import EditableRowComp from "./EditableRowComp";
import ReturnCar from "../returnCar/ReturnCar";
import Pagination from "../Page/Pagination";
import "../style/reset.css";
import "../style/table.css";
import "../style/inputAdd.css";
import "./User.css";

const apiUser = axios.create({ baseURL: `${url}/users` });
let addUserId = "n";
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
  const userItem = useRef(null);
  let idCompany = Object.values(addCompanyId)[0];
  const fetchPosts = async () => {
    setLoading(true);
    const res = await apiUser.get(`/${idCompany}`);
    setUserPosts(res.data);
    setLoading(false);
    console.log(res.data);
  };

  useEffect(() => {
    console.log("addCompanyId ===0", Object.values(addCompanyId)[0] === 0);
    console.log(idCompany);
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
    // this.getUsers(data);
  };
  const handleVisibleCompClick = (event, id) => {
    event.preventDefault();
    console.log("visible user", id);
    addUserId = id;
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
              handleVisibleCompClick={handleVisibleCompClick}
            />
          )}
        </Fragment>
      );
    });
  };
  //User => Company

  // const handleAddCompFormChange = (event) => {
  //   event.preventDefault();
  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;
  //   const newFormData = { ...addFormData };
  //   newFormData[fieldName] = fieldValue;
  //   setAddFormData(newFormData);
  // };

  // const handleAddCompFormSubmit = (event) => {
  //   event.preventDefault();
  //   const newUser = {
  //     // id: nanoid(),
  //     userName: addFormData.userName,
  //     userPassword: addFormData.userPassword,
  //   };
  //   const newUsers = [...postsUserComp, newUser];

  //   apiUser
  //     .post("/", newUser)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   setPostsUserComp(newUsers);
  //   setAddFormData("");
  // };

  // const handleEditCompFormSubmit = (event) => {
  //   event.preventDefault();

  //   const editedContact = {
  //     id: editContactId,
  //     userName: editFormData.userName,
  //     userPassword: editFormData.userPassword,
  //   };

  //   apiUser
  //     .put(`/`, editedContact)
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   const newFormData = { ...userPosts };
  //   userPosts.map((item) => {
  //     if (item.id === editContactId) {
  //       item.userName = editFormData.userName;
  //       item.userPassword = editFormData.userPassword;
  //     }
  //   });
  //   setEditContactId(null);
  // };

  // const handleEditCompFormChange = (event) => {
  //   event.preventDefault();

  //   const fieldName = event.target.getAttribute("name");
  //   const fieldValue = event.target.value;

  //   const newFormData = { ...editFormData };
  //   newFormData[fieldName] = fieldValue;

  //   setEditFormData(newFormData);
  // };

  // const handleEditCompClick = (event, user) => {
  //   event.preventDefault();
  //   setEditContactId(user.id);

  //   const formValues = {
  //     editId: user.id,
  //     userName: user.userName,
  //     userPassword: user.userPassword,
  //   };
  //   setEditFormData(formValues);
  // };

  // const handleCancelCompClick = () => {
  //   setEditCompId(null);
  // };

  // const handleDeleteCompClick = (userId) => {
  //   const newContacts = [...postsUserComp];

  //   const index = postsUserComp.findIndex((contact) => contact.id === userId);

  //   newContacts.splice(index, 1);

  //   setPostsUserComp(newContacts);
  //   apiUser.delete(`/${userId}`);
  // };
  // // Get current posts
  // const indexOfLastPostComp = currentPage * PageSize;
  // const indexOfFirstPostComp = indexOfLastPostComp - PageSize;
  // const currentPostsCompany = postsUserComp.slice(
  //   indexOfFirstPostComp,
  //   indexOfLastPostComp
  // );

  // // Change page
  // const paginateComp = (pageNumber) => setCurrentPageComp(pageNumber);

  // const renderIncomingDataComp = (data) => {
  //   return data.map((item) => {
  //     return (
  //       <Fragment key={item.id}>
  //         {editContactId === item.id ? (
  //           <EditableRow
  //             editFormData={editFormData}
  //             handleEditFormChange={handleEditFormChange}
  //             handleCancelClick={handleCancelClick}
  //           />
  //         ) : (
  //           <ReadOnlyRow
  //             item={item}
  //             handleEditClick={handleEditClick}
  //             handleDeleteClick={handleDeleteClick}
  //           />
  //         )}
  //       </Fragment>
  //     );
  //   });
  // };
  // const tableComp = () => {
  //   if (loadingUserComp) {
  //     return <h2>Loading data from company...</h2>;
  //   }
  //   return (
  //     <section className="empl-tab">
  //       <h1 className="text-primary "> Employee</h1>
  //       <form onSubmit={handleEditCompFormSubmit}>
  //         <table className="tab">
  //           <thead className="tab--thead">
  //             <tr className="tab--tr">
  //               <th className="tab__thead--th">ID:</th>
  //               <th className="tab__thead--th">Company:</th>
  //               <th className="tab__thead--th">city:</th>
  //               <th className="tab__thead--th">idEmployee:</th>
  //               <th className="tab__thead--th">nameEmployee :</th>
  //               <th className="tab__thead--th">Actions</th>
  //             </tr>
  //           </thead>
  //           <tfoot className="tab--tfoot">
  //             <tr>
  //               <td colspan="5" className="tab__tfoot--td">
  //                 <div className="container__page--div">
  //                   <Pagination
  //                     postsPerPage={PageSize}
  //                     totalPosts={postsUserComp.length}
  //                     paginate={paginateComp}
  //                   />
  //                 </div>
  //               </td>
  //             </tr>
  //           </tfoot>
  //           <tbody>{renderIncomingDataComp(currentPostsCompany)}</tbody>
  //         </table>
  //       </form>

  //       <section className="add-empl">
  //         <form onSubmit={handleAddCompFormSubmit}>
  //           <h2 className={"text_add"}>Add a new employee {userId}</h2>
  //           <input
  //             type="text"
  //             name="name"
  //             // ref={textInput}
  //             placeholder="name ..."
  //             // required="required"
  //             // ref={ref=>test=ref}
  //             onChange={handleAddCompFormChange}
  //           />
  //           <input
  //             type="text"
  //             name="lastName"
  //             // required="required"

  //             placeholder="last name ..."
  //             onChange={handleAddCompFormChange}
  //           />
  //           <input
  //             type="text"
  //             name="position"
  //             // required="required"

  //             placeholder="position  ..."
  //             onChange={handleAddCompFormChange}
  //           />
  //           <button type="submit">add</button>
  //           {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
  //         </form>
  //       </section>
  //     </section>
  //   );
  // };
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
      {/* <section className="car-tabl">
        <div>{tableComp()}</div>
      </section> */}
      {/* <button className={'user-label'} type="submit" onClick={this.Customer()}>gtregd</button> */}
      <section className="section-car">
        <ReturnCar addCompanyId={addCompanyId} addUserId={addUserId} />
      </section>
    </div>
  );
};

export default Customer;
