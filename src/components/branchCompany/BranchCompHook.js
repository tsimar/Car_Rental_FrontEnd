import React, { useState, useEffect, useRef, Fragment, ChatAPI, useCallback } from "react";
import axios from "axios";
import { nanoid } from 'nanoid';
// import './Cars.css';
// import { render } from "react-dom";
// import BranchCompanyPost from "./BranchCompanyPost";
import BranchCompanyPage from "./BranchCompanyPage"
import ReadOnlyRowD from './ReadOnlyRowD';
import EditableRowD from './EditableRowD';
import ReadOnlyRowCar from '../cars/ReadOnlyRowCar';
import EditableRowCar from '../cars/EditableRowCar';


// import { render } from "react-dom";
// import Cars from "./Cars";

const api = axios.create({ baseURL: 'http://localhost:8080/branchCompany' })

// axios.defaults.headers.post["Content-Type"] = "application/json";


const BranchCompHook = () => {
    console.log("REEEEEEEEEE_Branch");
    const [posts, setPosts] = useState([]);
    const [postsCar, setPostsCar] = useState([]);
    const [addFormData, setAddFormData] = useState({
        logo: '',
        nameRental: '',
        city: '',
        address: '',
    })

    const [editFormData, setEditFormData] = useState({
        logo: '',
        nameRental: '',
        city: '',
        address: '',
    })

    const [editPostsId, setEditPostsId] = useState(null);

    let addConpanyId= null;
    const [loadingCar, setLoadingCar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    const [error, setError] = useState();


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [unitPrice, setUnitPrice] = useState(null);


    const fetchDATA = async () => {


        const playerPic = `http://localhost:8080/cars/${addConpanyId}`

console.log('conpId',playerPic);

        const getComp = axios.get(playerPic);
        const getCars = axios.get(playerPic);

        axios.all([getCars, getComp]).then(
            axios.spread((...allData) => {
                setLoadingCar(true);
                const getCarsAll = allData[0]
                const allDataComp = allData[1]
                console.log('getCarsAll' + getCarsAll)
                setPostsCar(getCarsAll.data);
                setLoadingCar(false);
            })

        )
    }
    useEffect(() => {
        // fetchDATA();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const res = await api.get('/');
        setPosts(res.data);
        setLoading(false);
        console.log(res.data)
    }

    useEffect(() => {

        fetchPosts();
    }, []);





    const handleEditFormSubmit = event => {
        event.preventDefault();
        const editedContact = {
            id: editPostsId,
            logo: editFormData.logo,
            nameRental: editFormData.nameRental,
            city: editFormData.city,
            address: editFormData.address,

        };

        api.put(`/`, editedContact)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        const newFormData = { ...posts };

        posts.map((item) => {
            if (item.id === editPostsId) {

                item.logo = editedContact.logo;
                item.nameRental = editedContact.nameRental;
                item.city = editedContact.city;
                item.address = editedContact.address;

            }
        })
               setEditPostsId(null);
    }




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
        setEditPostsId(user.id)
        const formValues = {
            logo: user.logo,
            nameRental: user.nameRental,
            city: user.city,
            address: user.address,
        };
        setEditFormData(formValues)

    }

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

    }

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

        api.post('/', addFormData)
            .then(response => {
                console.log(response);

            })
            .catch(error => {
                console.log(error);
            })

        // fetchMyData();
    }



    const handleVisibleCarsClick = (event, id) => {
        event.preventDefault();

       addConpanyId=id;
       
       fetchDATA();
       addConpanyId=null;
    }




    const tableCars = () => {
        if (loadingCar) {
            return <h2>Loading...</h2>
        }
        return (
          <form onSubmit={handleVisibleCarsClick}>
            <table className={"user-main-tab"}>
              <thead>
                <tr>
                  <th width={"50"}>ID:</th>
                  <th width={"200"}>Producent:</th>
                  <th width={"100"}>Model:</th>
                  <th width={"100"}>Type:</th>
                  <th width={"50"}>Yers:</th>
                  <th width={"50"}>Color:</th>
                  <th width={"100"}>Mileages:</th>
                  <th width={"100"}>Status rental:</th>
                  <th width={"100"}>Status car:</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{handleAddCars()}</tbody>
            </table>
          </form>
        );
    }


    const handleAddCars = () => {


        console.log('cars', postsCar);
        
            return (postsCar.map(item => {

            return (
                <Fragment key={item.id} >
                    {(editPostsId === item.id) ? (
                        <EditableRowCar

                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                            handleAddCars={handleAddCars}
                        />

                    ) :
                        (
                            <ReadOnlyRowCar item={item}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                                handleAddCars={handleAddCars}
                            />
                        )
                    }
                    {/*  */}
                </Fragment>

            )
        })
        );

        
        // fetchMyData();

       

    }

    const renderIncomingData = (data) => {
        // if (loading) {
        //     return <h2>Loading...</h2>
        // }


        return (data.map(item => {

            return (
                <Fragment key={item.id} >
                    {(editPostsId === item.id) ? (
                        <EditableRowD

                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                            handleVisibleCarsClick={handleVisibleCarsClick}
                        />

                    ) :
                        (
                            <ReadOnlyRowD item={item}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                                handleVisibleCarsClick={handleVisibleCarsClick}
                            />
                        )
                    }
                    {/*  */}
                </Fragment>

            )
        })
        );
    }
    const handleDeleteClick = (departId) => {
        const newContacts = [...posts];

        const index = posts.findIndex((contact) => (contact.id === departId));

        newContacts.splice(index, 1);

        setPosts(newContacts);
        api.delete(`/${departId}`)
        // this.getUsers(data);
    };



    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (

        <React.Fragment>
            <h1 className="text-primary mb-3">
                Flota

            </h1>

            <div >
                <form onSubmit={handleEditFormSubmit}>
                    <table className={"user-main-tab"}>
                        <thead>
                            <tr>
                                <th width={"50"}>ID:</th>
                                <th width={"200"}>Logo:</th>
                                <th width={"250"}>Name's department:</th>
                                <th width={"200"}>city:</th>
                                <th width={"200"}>address:</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody >
                            {renderIncomingData(currentPosts)}

                        </tbody>
                    </table>
                </form>
            </div>
            <BranchCompanyPage postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
            <div >
                {tableCars()}


            </div>




            {/* {renderIncomingData()} */}
            <div className='add'>
                <h2 className={"text_add"}>Add a new DEPARTMENT</h2>
                <form onSubmit={handleAddFormSubmit} className={"table_add"}>
                    <div >
                        <input
                            type='text'
                            name='logo'
                            placeholder='logo department'
                            required="required"
                            onChange={handleAddFormChange} />
                    </div>
                    <div >
                        <input
                            type='text'
                            name='nameRental'
                            // required="required"

                            placeholder='name department ...'

                            onChange={handleAddFormChange}

                        />
                    </div>
                    <div >
                        <input
                            type='text'
                            name='city'
                            // required="required"

                            placeholder='city  ...'

                            onChange={handleAddFormChange}

                        />
                    </div>
                    <div>
                        <label htmlFor="address">address</label>
                        <input
                            type='text'
                            name='address'
                            // required="required"

                            placeholder='address  ...'

                            onChange={handleAddFormChange}

                        /> </div>


                    <button type="submit">add</button>

                    {/* <Input className={'user-label'} type="submit" value='Dodaj'>Dodaj</Input> */}
                </form>
            </div>


        </React.Fragment>
    );

};

export default BranchCompHook;