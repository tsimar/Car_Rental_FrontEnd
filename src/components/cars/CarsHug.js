import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import './Cars.css';
import { render } from "react-dom";
import CarsHugPost from "./CarsHugPost";
import CarsHugPage from "./CarsHugPage"
// import { render } from "react-dom";
// import Cars from "./Cars";

const api = axios.create({ baseURL: 'http://localhost:8080/cars' })


const CarsHug = (cars) => {
    console.log("REEEEEEEEEE");
    const [post, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('http://localhost:8080/cars');
            setPosts(res.data);
            setLoading(false);
        }

        fetchPosts();
        // setPosts(cars.data);

    }, []);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = post.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);



    return (
        <div>
            <h1 className="text-primary mb-3">
                Flota 
            </h1>
           <CarsHugPost  post={currentPosts} /*loading={loading}*/ />
            <CarsHugPage postsPerPage={postsPerPage}
                totalPosts={post.length}
                paginate={paginate}
            />
            
            
            </div>
    );

};

export default CarsHug;