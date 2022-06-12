import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useCallback,
  useDebugValue,
  useMemo,
} from "react";
import { url } from "../../url";
import axios from "axios";
import { nanoid } from "nanoid";
import Pagination from "../Page/Pagination";
import ReadOnlyRowD from "./ReadOnlyRowD";
import EditableRowD from "./EditableRowD";
import "../style/reset.css";
// import "./BranchCompany.css";
import "../style/table.css";
import "../style/inputAdd.css";

const api = axios.create({ baseURL: `${url}/branchCompany` });

let addCompanyId = "n";

const Department = () => {
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
    setCompId(id);
    console.log(compId);
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
    addCompanyId = "d";
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
      <div className="comp-emp_wrapper">
        <section className="comp-wrapper">
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
                      <td colspan="6" className="tab__tfoot--td">
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
              <div>
                <input
                  className="container_add--input"
                  ref={logoRef}
                  type="text"
                  name="logo"
                  placeholder="logo department"
                  required="required"
                  onChange={handleAddFormChange}
                />
              </div>
              <div>
                <input
                  className="container_add--input"
                  type="text"
                  name="nameRental"
                  placeholder="name department ..."
                  onChange={handleAddFormChange}
                />
              </div>
              <div>
                <input
                  className="container_add--input"
                  type="text"
                  name="city"
                  placeholder="city  ..."
                  onChange={handleAddFormChange}
                />
              </div>
              <div>
                <input
                  className="container_add--input"
                  type="text"
                  name="address"
                  placeholder="address  ..."
                  onChange={handleAddFormChange}
                />
              </div>
              <button type="submit">add</button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Department;
