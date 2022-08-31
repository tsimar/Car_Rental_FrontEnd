import React, { useState, useEffect, useRef, Fragment } from "react";
import { url } from "../../../url";
import axios from "axios";

import { useLocation } from "react-router-dom";
import Pagination from "../Page/Pagination";
import ReadOnlyRowD from "./ReadOnlyRowDS";
import EditableRowD from "./EditableRowD";
import Customer from "../user/Customer";
import "../../../style/reset.css";
import "./Department.css";
import "../../../style/table.css";

import "../../../style/inputAdd.css";

import { useDispatch } from "react-redux";
import { newIdComp } from "../../../redux/idCompSlice";

const api = axios.create({ baseURL: `${url}/branchCompany` });

// const initialState = {
//   idCompany: 0,
//   setIdCompany: () => {},
// };
// const GlobalContext = createContext(initialState);
// function GlobalContextProvider({ newIdCompany }) {
//   const [idCompany, setIdCompany] = useState(0);
//   return (
//     <GlobalContext.Provider value={{ idCompany, setIdCompany }}>
//       {newIdCompany}
//     </GlobalContext.Provider>
//   );
// }

const Department = () => {
  const dispatch = useDispatch();
  const location = useLocation("");

  let tableAfterUser = location.pathname.split("/");

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize] = useState(5);
  const [compId, setCompId] = useState(0);
  const [editPostsId, setEditPostsId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [addFormData, setAddFormData] = useState({
    logo: "",
    nameRental: "",
    city: "",
    address: "",
  });
  const logoRef = useRef(null);
  const returnCar = 1;
  const [editFormData, setEditFormData] = useState({
    logo: "",
    nameRental: "",
    city: "",
    address: "",
  });

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

    posts.map((item) =>
      item.id === editPostsId
        ? ((item.logo = editedContact.logo),
          (item.nameRental = editedContact.nameRental),
          (item.city = editedContact.city),
          (item.address = editedContact.address))
        : ""
    );
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

  const handleOnClickComp = (event, id) => {
    event.preventDefault();
    console.log("idsss", id);
    dispatch(newIdComp({ title: id }));
  };

  const renderIncomingData = (data) => {
    return data.map((item) => {
      return (
        <Fragment key={item.id}>
          {editPostsId === item.id ? (
            <EditableRowD
              editFormData={editFormData}
              handleEditFormChange={handleEditFormChange}
              handleCancelClick={handleCancelClick}
            />
          ) : (
            <ReadOnlyRowD
              item={item}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              handleOnClickComp={handleOnClickComp}
            />
          )}
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
  };

  // Get current posts

  let indexOfLastPost = currentPage * PageSize;
  if (posts.length <= indexOfLastPost - PageSize) {
    indexOfLastPost = Math.ceil(posts.length / PageSize) * PageSize;
  }
  const indexOfFirstPost = indexOfLastPost - PageSize;

  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    // <GlobalContextProvider>
    <div className="container_depRet">
      <section className="comp-wrapper_depRet">
        <div className="tabl-comp">
          <h1 className="text-primary ">DEPARTMENT</h1>
          <div className="container-table-comp">
            <form onSubmit={handleEditFormSubmit}>
              <table className="tab">
                <thead className="tab--thead">
                  <tr className="tab--tr">
                    <th className="tab__thead--th">ID:</th>
                    <th className="tab__thead--th">Logo:</th>
                    <th className="tab__thead--th">department:</th>
                    <th className="tab__thead--th">city:</th>
                    <th className="tab__thead--th">address:</th>
                    <th className="tab__thead--th">Actions</th>
                  </tr>
                </thead>
                <tfoot className="tab--tfoot">
                  <tr>
                    <td colSpan="6" className="tab__tfoot--td">
                      <div className="container__page--div">
                        <Pagination
                          postsPerPage={PageSize}
                          totalPosts={posts.length}
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
        </div>
      </section>
      <section className="section-empl_depRet">
        <Customer returnCar={tableAfterUser[1]} />
      </section>
    </div>
  );
};

export default Department;
