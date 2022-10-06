import React, { useState, useEffect, useRef, Fragment } from "react"; // useCallback,  useDebugValue,  useMemo,
import { url } from "../../../url";
import axios from "axios";
import Pagination from "../Page/Pagination";
import ReadOnlyRowD from "./ReadOnlyRowD";
import EditableRowD from "./EditableRowD";
import EmployeeBranchHook from "../employee/EmployeeBranchHook";
import CarsBranchHook from "../typeCars/CarsBranchHook";
import "../../../style/reset.css";
import "../../../style/table.css";
import "../../../style/inputAdd.css";
import "./BranchCompany.css";

import { useDispatch } from "react-redux";
import { newIdComp } from "../../../redux/idCompSlice";
import AddCompany from "./AddCompany";
import TheadTableCompany from "./TheadTableCompany";
// import { useSelector } from "react-redux";
const api = axios.create({ baseURL: `${url}/branchCompany` });
// const apiCar = axios.create({ baseURL: `${url}/cars` });
// const apiEmpl = axios.create({ baseURL: `${url}/employees` });

// let addCompanyId = "n";

const BranchCompHook = () => {
  const dispatch = useDispatch();

  // const stateIdCompany = useSelector((state) => state.idComp.title);
  // let idCompany = 0;
  // if (typeof stateIdCompany === "number") {
  //   idCompany = 0;
  // } else {
  //   idCompany = stateIdCompany.title;
  // }

  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize] = useState(5);

  const [editPostsId, setEditPostsId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addFormData, setAddFormData] = useState({
    logo: "",
    nameRental: "",
    city: "",
    address: "",
  });
  const logoRef = useRef(null);

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
        fetchPosts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
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
    api
      .post("/", addFormData)
      .then((response) => {
        fetchPosts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    event.target.reset();
  };

  const handleVisibleCarsClick = (event, id) => {
    event.preventDefault();
    dispatch(newIdComp({ title: id }));
    console.log(loading);
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
    <div className="container">
      <div className="comp-emp_wrapper_d">
        <section className="comp-wrapper_d">
          <div className="tabl-comp">
            <h1 className="text-primary ">DEPARTMENT</h1>
            <div className="container-table-comp">
              <form onSubmit={handleEditFormSubmit}>
                <table className="tab">
                  <thead className="tab--thead">
                    <TheadTableCompany />
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
          <div className="container--add">
            <h2 className="container_add--h1">Add a new DEPARTMENT</h2>
            <form
              onSubmit={handleAddFormSubmit}
              className={"container_add--form"}
            >
              <AddCompany handleAddFormChange={handleAddFormChange} />
              <button type="submit">add</button>
            </form>
          </div>
        </section>
        <section className="section-empl">
          <EmployeeBranchHook />
        </section>
      </div>
      <section className="section-car">
        <CarsBranchHook />
      </section>
    </div>
  );
};

export default BranchCompHook;
