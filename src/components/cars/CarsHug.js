import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import './Cars.css';
import { render } from "react-dom";
import CarsHugPost from "./CarsHugPost";
import CarsHugPage from "./CarsHugPage"
// import { render } from "react-dom";
// import Cars from "./Cars";
// axios.defaults.headers.common['Authorization'] = "http://localhost:8080/cars";
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
const api = axios.create({
    baseURL: 'http://localhost:8080/cars', timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-*': '*'
    }
});



const CarsHug = ( postsCar,id) => {
    console.log("Cars");
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    // const fetchDATA = async () => {


    //     const playerPic = `http://localhost:8080/cars/${id}`



    //     const getComp = axios.get(playerPic);
    //     const getCars = axios.get(playerPic);

    //     axios.all([getCars, getComp]).then(
    //         axios.spread((...allData) => {
    //             setLoading(true);
    //             const getCarsAll = allData[0]
    //             const allDataComp = allData[1]
    //             console.log('getCarsAll' + getCarsAll)
    //             setPosts(allDataComp);
    //             setLoading(false);
    //         })

    //     )
    // }
    // useEffect(() => {
    //     fetchDATA();
    // }, []);


    //     fetchPosts();
    //     // setPosts(cars.data);

    // }, []);
    setPosts(postsCar);
    if (!posts) return null;
    // Get current posts
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <div>
            <h1 className="text-primary mb-3">
                Flota
            </h1>

            {/* {!loading && posts.length > 0 && <CarsHugPost post={posts} />}


            <CarsHugPage postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            /> */}


        </div>
    );

};

export default CarsHug;