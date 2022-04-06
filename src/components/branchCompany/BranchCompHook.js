import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  ChatAPI,
  useCallback,
  useDebugValue,
  useMemo,
} from "react";
import axios from "axios";
import { nanoid } from "nanoid";

// import BranchCompanyPage from "./BranchCompanyPage";
import Pagination from "../Page/Pagination";
import ReadOnlyRowD from "./ReadOnlyRowD";
import EditableRowD from "./EditableRowD";
import ReadOnlyRowEmpl from "../employee/ReadOnlyRowEmpl";
import EditableRowEmpl from "../employee/EditableRowEmpl";
import CurrentPageSize from "./CurrentPageSize";
import CarsBranchHook from "../typeCars/CarsBranchHook";
import "./BranchCompany.css";

import { render } from "react-dom";

const api = axios.create({ baseURL: "http://localhost:8080/branchCompany" });
const apiCar = axios.create({ baseURL: "http://localhost:8080/cars" });
const apiEmpl = axios.create({ baseURL: "http://localhost:8080/employees" });

var addCompanyId = "n";

const BranchCompHook = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [PageSize] = useState(5);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  const [editPostsId, setEditPostsId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addFormData, setAddFormData] = useState({
    logo: "",
    nameRental: "",
    city: "",
    address: "",
  });

  const [editFormData, setEditFormData] = useState({
    logo: "",
    nameRental: "",
    city: "",
    address: "",
  });
  // CONST FROM CAR

  let test = useRef("");
  const [postsCar, setPostsCar] = useState([]);
  const fetchDATA = async () => {
    const playerPic = `http://localhost:8080/cars/${addCompanyId}`;

    console.log("conpId", playerPic);

    const getCars = apiCar.get(`/${addCompanyId}`);

    axios.all([getCars]).then(
      axios.spread((...allData) => {
        // setLoadingCar(true);
        const getCarsAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getCarsAll" + getCarsAll);
        setPostsCar(getCarsAll.data);
        // setLoadingCar(false);
      })
    );
  };
  // CONST FROM Employee

  const [currentPageEmpl, setCurrentPageEmpl] = useState(1);
  const [postsEmpl, setPostsEmpl] = useState([]);
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

  const [editPostsEmplId, setEditPostsEmplId] = useState(null);
  const [loadingEmpl, setLoadingEmpl] = useState(false);

  const fetchDATAEmpl = async () => {
    // const playerPic1 = `http://localhost:8080/employees/${addCompanyId}`;

    // console.log("conpId", playerPic1);

    const getEmpl = apiEmpl.get(`/${addCompanyId}`);

    axios.all([getEmpl]).then(
      axios.spread((...allData) => {
        setLoadingEmpl(true);
        const getEmplAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getEmplAll" + getEmplAll.data);
        setPostsEmpl(getEmplAll.data);
        setLoadingEmpl(false);
      })
    );
  };
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

    posts.map((item) => {
      if (item.id === editPostsId) {
        item.logo = editedContact.logo;
        item.nameRental = editedContact.nameRental;
        item.city = editedContact.city;
        item.address = editedContact.address;
      }
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

    const newComp = {
      id: nanoid(),
      logo: addFormData.logo,
      nameRental: addFormData.nameRental,
      city: addFormData.city,
      address: addFormData.address,
    };
    const newComps = [...posts, newComp];

    api
      .post("/", addFormData)
      .then((response) => {
        fetchPosts();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // WORK FROM Employee

  const handleAddFormEmplChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormDataEmpl };
    newFormData[fieldName] = fieldValue;

    setAddFormDataEmpl(newFormData);
  };
  // const textInput = useRef("");

  const handleAddFormEmplSubmit = (event) => {
    event.preventDefault();

    const newEmpl = {
      // id: nanoid(),
      name: addFormDataEmpl.name,
      lastName: addFormDataEmpl.lastName,
      position: addFormDataEmpl.position,
      carRentalDepartID: addCompanyId,
    };
    const newEmpls = [...postsEmpl, newEmpl];
    console.log("newEmpl-583", newEmpl);
    setAddFormDataEmpl(newEmpl);
    apiEmpl
      .post("/", newEmpl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    // textInput.current.value='';

    setPostsEmpl(newEmpls);
    setAddFormDataEmpl("");
    // fetchDATAEmpl();
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
      })
      .catch((error) => {
        console.log(error);
      });
    const newFormData = { ...postsEmpl };

    postsEmpl.map((item) => {
      if (item.id === editPostsEmplId) {
        item.name = editFormDataEmpl.name;
        item.lastName = editFormDataEmpl.lastName;
        item.position = editFormDataEmpl.position;
        item.carRentalDepartID = editFormDataEmpl.carRentalDepartID;
      }
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

    return data.map((item) => {
      return (
        <Fragment key={item.id}>
          {editPostsEmplId === item.id ? (
            <EditableRowEmpl
              editFormDataEmpl={editFormDataEmpl}
              handleEditFormEmplChange={handleEditFormEmplChange}
              handleCancelEmplClick={handleCancelEmplClick}
              // handleAddCars={handleAddCars}
            />
          ) : (
            <ReadOnlyRowEmpl
              // loading={loadingCar}
              item={item}
              handleEditEmplClick={handleEditEmplClick}
              handleDeleteEmplClick={handleDeleteEmplClick}
              // handleAddCars={handleAddCars}
            />
          )}
          {/*  */}
        </Fragment>
      );
    });

    // fetchMyData();
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

  const tableEmpl = () => {
    if (loadingEmpl) {
      return <h2>Loading employeee...</h2>;
    }
    return (
      <section className="empl-tab">
        <h1> Employee</h1>
        <form onSubmit={handleEditFormEmplSubmit}>
          <table className={"comp-main-tab"}>
            <thead>
              <tr>
                <th width={"50"}>ID:</th>
                <th width={"100"}>Name:</th>
                <th width={"100"}>Last Name:</th>
                <th width={"100"}>Position:</th>
                <th width={"50"}>ID company:</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{handleAddEmpl(currentPostsEmpl)}</tbody>
          </table>
        </form>
        <Pagination
          postsPerPage={PageSize}
          totalPosts={postsEmpl.length}
          paginate={paginateEmpl}
        />
        <section className="add-empl">
          <form onSubmit={handleAddFormEmplSubmit}>
            <h2 className={"text_add"}>Add a new employee {addCompanyId}</h2>
            <input
              type="text"
              name="name"
              placeholder="name ..."
              onChange={handleAddFormEmplChange}
            />
            <input
              type="text"
              name="lastName"
              // required="required"

              placeholder="last name ..."
              onChange={handleAddFormEmplChange}
            />
            <input
              type="text"
              name="position"
              // required="required"

              placeholder="position  ..."
              onChange={handleAddFormEmplChange}
            />
            <button type="submit">add</button>
            {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
          </form>
        </section>
      </section>
    );
  };

  const handleVisibleCarsClick = (event, id) => {
    event.preventDefault();

    addCompanyId = id;
    // test.current.value = id;
    // company = "addCompanyId";
    fetchDATA();
    fetchDATAEmpl();
  };

  const renderIncomingData = (data) => {
    console.log("data render in coming 453= ", data);
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
    indexOfLastPost = (currentPage - 1) * PageSize;
  }
  const indexOfFirstPost = indexOfLastPost - PageSize;

  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // const currentPostsFunction = () => {
  //   return;
  //   <CurrentPageSize
  //     currentPage={currentPage}
  //     PageSize={PageSize}
  //     posts={posts}
  //   />;
  // };

  return (
    <div className="body-comp">
      <section className="section-comp">
        <div className="h1-tabl-page">
          <h1 className="text-primary ">DEPARTMENT</h1>

          <div className="form-table-comp">
            <form onSubmit={handleEditFormSubmit}>
              <table className={"comp-main-tab"}>
                <thead>
                  <tr>
                    <th>ID:</th>
                    <th>Logo:</th>
                    <th>department:</th>
                    <th>city:</th>
                    <th>address:</th>
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
        <div className="add-comp">
          <h2 className={"text_add"}>Add a new DEPARTMENT</h2>
          <form onSubmit={handleAddFormSubmit} className={"table_add"}>
            <div>
              <input
                type="text"
                name="logo"
                placeholder="logo department"
                required="required"
                onChange={handleAddFormChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="nameRental"
                // required="required"
                placeholder="name department ..."
                onChange={handleAddFormChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="city"
                // required="required"

                placeholder="city  ..."
                onChange={handleAddFormChange}
              />
            </div>
            <div>
              <input
                type="text"
                name="address"
                // required="required"

                placeholder="address  ..."
                onChange={handleAddFormChange}
              />{" "}
            </div>

            <button type="submit">add</button>

            {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
          </form>
        </div>
      </section>
      <section className="section-empl">{tableEmpl()}</section>
      <section>
        <CarsBranchHook
          addCompanyId={addCompanyId}
          getAllByIdBranchComp={postsCar}
        />
      </section>
    </div>
  );
};

export default BranchCompHook;
