import React, { useState, useEffect, useRef, Fragment, ChatAPI } from "react";
import axios from "axios";
import { nanoid } from 'nanoid';
// import './Cars.css';
// import { render } from "react-dom";
import BranchCompanyPost from "./BranchCompanyPost";
import BranchCompanyPage from "./BranchCompanyPage"
import ReadOnlyRowD from './ReadOnlyRowD';
import EditableRowD from './EditableRowD';
import CarsHug from "../cars/CarsHug";

// import { render } from "react-dom";
// import Cars from "./Cars";

const api = axios.create({ baseURL: 'http://localhost:8080/branchCompany' })

// axios.defaults.headers.post["Content-Type"] = "application/json";


const BranchCompHook = () => {
    console.log("REEEEEEEEEE_Branch");
    const [posts, setPosts] = useState([]);
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



    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
   

    const [error, setError] = useState();


    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [unitPrice, setUnitPrice] = useState(null);


    // const fetchDATA = async () => {


    //     const playerPic = 'http://localhost:8080/cars'



    //     const getComp = axios.get(playerPic);
    //     const getCars = axios.get(playerPic);

    //     axios.all([getCars, getComp]).then(
    //         axios.spread((...allData) => {
    //             setLoading(true);
    //             const getCarsAll = allData[0]
    //             const allDataComp = allData[1]
    //             console.log('getCarsAll' + getCarsAll)
    //             console.log(allDataComp)
    //             setLoading(false);
    //         })

    //     )
    // }
    // useEffect(() => {
    //     fetchDATA();
    // }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const res = await api.get('/');
        setPosts(res.data);
        setLoading(false);
        console.log(res.data)
    }

    useEffect(() => {
       
        fetchPosts();

        // function handleStatusChange(status) {
        //     setPosts(status.posts);
        // }
        // ChatAPI.subscribeToFriendStatus(posts.friend.id, handleStatusChange);
        // // Określ sposób sprzątania po tym efekcie:
        // return function cleanup() {
        //     ChatAPI.unsubscribeFromFriendStatus(posts.friend.id, handleStatusChange);
        // };

    }, []);





    const handleEditFormSubmit = event => {
        event.preventDefault();
// console.log('index - ',index);
        const editedContact = {
            id:editPostsId,
            logo:editFormData.logo,
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
    //    let editPosts=[...posts];
    //    editPosts[index]=event.target.value;
    //      setPosts(editPosts);
    // const fieldName = event.target.getAttribute("name");
    // const fieldValue = event.target.value;

    const newFormData = { ...posts };
  
// for (let i=0;i<posts.length;i++){
    posts.map((item)=>{
         if (item.id===editPostsId){

            item.logo=editedContact.logo;
            item.nameRental=editedContact.nameRental;
            item.city=editedContact.city;
            item.address=editedContact.address;

    }
    })
   
// }
       setEditPostsId( null);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(  newFormData );
    };

    const handleEditClick = (event, user) => {
        event.preventDefault();
        setEditPostsId(user.id)
        const formValues = {
            logo: user.logo,
            nameRental: user.nameRental,
            city:user.city,
            address:user.address,
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

      
    }




    const renderIncomingData = () => {
        return (posts.map(item => {

            return (
                <Fragment key={item.id} >
                    {(editPostsId === item.id) ? (
                        <EditableRowD

                            editFormData={editFormData}
                            handleEditFormChange={handleEditFormChange}
                            handleCancelClick={handleCancelClick}
                        // chancheHandler={this.chancheHandler}

                        />

                    ) :
                        (
                            <ReadOnlyRowD item={item}
                                handleEditClick={handleEditClick}
                                handleDeleteClick={handleDeleteClick}
                            // chancheHandler={chancheHandler}
                            // handleAddCars={handleAddCars}
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

        setPosts( newContacts);
        api.delete(`/${departId}`)
        // this.getUsers(data);
    };



    //   const newDeparts = [...posts, newDepart]

    // setPosts(newDepart);


    //   setPosts(newDepart.data);




    // this.setState({
    //   [event.target.name]: event.target.value,
    // });

    // this.setState({
    //   headCompany: newDeparts,


    // })

    // this.componentDidMount();



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
                            {renderIncomingData()}

                        </tbody>
                    </table>
                </form>
            </div>



          
            <BranchCompanyPage postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            /> 

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