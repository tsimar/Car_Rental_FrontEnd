import React, { useCallback, useState } from 'react';
import CarsHug from '../cars/CarsHug';
import './BranchCompany.css';
import EditableRowD from './EditableRowD'

const BranchCompanyPost = ({ props,posts, loading }) => {
    // const [colorClass, setColorClass] = useState("user-add");
    // const [postID, setPostID] = useState(1);
    // console.log( 'branchPost'+posts);
    if (loading) {
        return <h2>Loading...</h2>;
    }



    // const handleEditClick = useCallback(async () => {

    // })




    return (
        // <ul className='list-group mb-4'>
        //     {posts.map(post => (
        //         <li key={post.id} className='list-group-item'>
        //             {post.id} 

        //         </li>
        //     ))}
        // </ul>

        <div>
            <form >
                <table >
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
                        {posts.map(post => (

                            <tr border={"2"} key={post.id} >
                                <td width={"50"}>{post.id}</td>
                                <td width={"200"}>{post.logo}</td>
                                <td width={"200"}>{post.nameRental}</td>
                                <td width={"200"}>{post.city}</td>
                                <td width={"200"}>{post.address}</td>
                                <td>
                                    <button type="button">
                                        {/*  onClick={handleEditClick( post)}> */}
                                        Edit
                                    </button>
                                    <button type="button" >
                                        {/* onClick={()=>handleDeleteClick(item.id)}>  */}
                                        Delete
                                    </button>
                                </td>
                            </tr >
                        ))}
                    </tbody>
                </table>
            </form>




        </div>
    )


};

export default BranchCompanyPost