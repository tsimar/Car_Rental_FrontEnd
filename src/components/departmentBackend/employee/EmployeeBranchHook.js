import React, { useState, useRef, Fragment, useEffect } from "react";
import { url } from "../../../url";
import ReadOnlyRowEmpl from "./ReadOnlyRowEmpl";
import EditableRowEmpl from "./EditableRowEmpl";
import Pagination from "../Page/Pagination";
import "../../../style/table.css";
import "./Empl.css";
import axios from "axios";
import { useSelector } from "react-redux";
import AddEmployee from "./AddEmployee";

const apiEmpl = axios.create({ baseURL: `${url}/employees` });

const EmployeeBranchHook = () => {
  const stateIdCompany = useSelector((state) => state.idComp.title);

  let idCompany = 0;
  if (typeof stateIdCompany === "number") {
    idCompany = 0;
  } else {
    idCompany = stateIdCompany.title;
  }

  const [currentPageEmpl, setCurrentPageEmpl] = useState(1);
  const [postsEmpl, setPostsEmpl] = useState([]);
  const [PageSize] = useState(5);
  const nameEmpl = useRef(null);
  const [editPostsEmplId, setEditPostsEmplId] = useState(null);
  const [loadingEmpl, setLoadingEmpl] = useState(false);

  const [addFormDataEmpl, setAddFormDataEmpl] = useState({
    name: "",
    lastName: "",
    position: "",
    carRentalDepartID: "",
  });

  const [editFormDataEmpl, setEditFormDataEmpl] = useState({
    name: "",
    lastName: "",
    position: "",
    carRentalDepartID: "",
  });

  const fetchDATAEmpl = async () => {
    const getEmpl = apiEmpl.get(`/${idCompany}`);
    axios.all([getEmpl]).then(
      axios.spread((...allData) => {
        setLoadingEmpl(true);
        const getEmplAll = allData[0];
        console.log("getEmplAll" + getEmplAll.data);
        setPostsEmpl(getEmplAll.data);
        setLoadingEmpl(false);
      })
    );
  };

  useEffect(() => {
    fetchDATAEmpl();
  }, [idCompany]);

  const handleAddFormEmplChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormDataEmpl };
    newFormData[fieldName] = fieldValue;
    setAddFormDataEmpl(newFormData);
  };

  const handleAddFormEmplSubmit = (event) => {
    event.preventDefault();
    const newEmpl = {
      name: addFormDataEmpl.name,
      lastName: addFormDataEmpl.lastName,
      position: addFormDataEmpl.position,
      carRentalDepartID: idCompany,
    };
    setAddFormDataEmpl(newEmpl);
    apiEmpl
      .post("/", newEmpl)
      .then((response) => {
        fetchDATAEmpl();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    setAddFormDataEmpl("");
  };

  const handleEditFormEmplSubmit = (event) => {
    event.preventDefault();
    const editedEmpl = {
      id: editPostsEmplId,
      name: editFormDataEmpl.name,
      lastName: editFormDataEmpl.lastName,
      position: editFormDataEmpl.position,
      carRentalDepartID: editFormDataEmpl.carRentalDepartID,
    };

    apiEmpl
      .put(`/`, editedEmpl)
      .then((response) => {
        console.log(response);
        fetchDATAEmpl();
      })
      .catch((error) => {
        console.log(error);
      });
    setEditPostsEmplId(null);
  };

  const handleEditFormEmplChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormDataEmpl };
    newFormData[fieldName] = fieldValue;

    setEditFormDataEmpl(newFormData);
    console.log("edit change Empl");
  };

  const handleEditEmplClick = (event, empl) => {
    event.preventDefault();
    console.log("click edit Empl");
    setEditPostsEmplId(empl.id);
    const formValues = {
      name: empl.name,
      lastName: empl.lastName,
      position: empl.position,
      carRentalDepartID: empl.carRentalDepartID,
    };
    setEditFormDataEmpl(formValues);
  };

  const handleCancelEmplClick = () => {
    setEditPostsEmplId(null);
  };

  const handleDeleteEmplClick = (emplId) => {
    const newEmpls = [...postsEmpl];

    const index = postsEmpl.findIndex((contact) => contact.id === emplId);

    newEmpls.splice(index, 1);

    setPostsEmpl(newEmpls);
    apiEmpl.delete(`/${emplId}`);
  };

  const handleAddEmpl = (data) => {
    console.log("empl-342", data);
    console.log(loadingEmpl);
    return data.map((item) => {
      return (
        <Fragment key={item.id}>
          {editPostsEmplId === item.id ? (
            <EditableRowEmpl
              editFormDataEmpl={editFormDataEmpl}
              handleEditFormEmplChange={handleEditFormEmplChange}
              handleCancelEmplClick={handleCancelEmplClick}
            />
          ) : (
            <ReadOnlyRowEmpl
              item={item}
              handleEditEmplClick={handleEditEmplClick}
              handleDeleteEmplClick={handleDeleteEmplClick}
            />
          )}
        </Fragment>
      );
    });
  };
  // Get current posts
  const indexOfLastPostEmpl = currentPageEmpl * PageSize;
  const indexOfFirstPostEmpl = indexOfLastPostEmpl - PageSize;
  const currentPostsEmpl = postsEmpl.slice(
    indexOfFirstPostEmpl,
    indexOfLastPostEmpl
  );

  // Change page
  const paginateEmpl = (pageNumber) => setCurrentPageEmpl(pageNumber);

  return (
    <div>
      <div className="container--tab">
        <h1 className="text-primary ">Employee</h1>
        <form onSubmit={handleEditFormEmplSubmit}>
          <table className="tab empl--tab">
            <thead className="tab--thead">
              <tr className="tab--tr">
                <th className="tab__thead--th">ID:</th>
                <th className="tab__thead--th">Name:</th>
                <th className="tab__thead--th">Last Name:</th>
                <th className="tab__thead--th">Position:</th>
                <th className="tab__thead--th">ID com:</th>
                <th className="tab__thead--th">Actions</th>
              </tr>
            </thead>
            <tfoot className="tab--tfoot">
              <tr>
                <td colSpan="6" className="tab__tfoot--td">
                  <div className="container__page--div">
                    <Pagination
                      postsPerPage={PageSize}
                      totalPosts={postsEmpl.length}
                      paginate={paginateEmpl}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>{handleAddEmpl(currentPostsEmpl)}</tbody>
          </table>
        </form>
      </div>
      <section className="container--add">
        <h2 className="container_add--h1">Add a new employee {idCompany}</h2>
        <form
          className="container_add--form"
          onSubmit={handleAddFormEmplSubmit}
        >
          <AddEmployee handleAddFormEmplChange={handleAddFormEmplChange} />

          <button type="submit">add</button>
        </form>
      </section>
    </div>
  );
};

export default EmployeeBranchHook;
