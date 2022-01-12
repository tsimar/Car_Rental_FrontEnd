import React, { useState } from 'react';
import './Cars.css';

const CarsHugPost = ({ posts, loading }) => {
    const [colorClass, setColorClass] = useState("user-add");
    console.log(posts);
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <ul className='list-group mb-4'>
            {posts.map(post => (
                <li key={post.id} className='list-group-item'>
                    {post.id} 

                </li>
            ))}
        </ul>
        // <div>
        //     <form >
        //         <table >
        //             <thead>
        //                 <tr>
        //                     <th width={"50"}>ID:</th>
        //                     <th width={"200"}>Logo:</th>
        //                     <th width={"250"}>Name's department:</th>
        //                     <th width={"200"}>city:</th>
        //                     <th width={"200"}>address:</th>
        //                     <th>Actions</th>
        //                 </tr>
        //             </thead>
        //             <tbody >
        //                 {posts.map(post => (

        //                     <tr border={"2"} key={post.id} >
        //                         <td width={"50"}>{post.id}</td>
        //                         <td width={"200"}>{post.model}</td>
        //                         <td>
        //                             <button type="button">
        //                                 {/* onClick={(event) => handleEditClick(event, item)}> */}
        //                                 Edit
        //                             </button>
        //                             <button type="button" >
        //                                 {/* onClick={()=>handleDeleteClick(item.id)}>  */}
        //                                 Delete
        //                             </button>
        //                         </td>
        //                     </tr >
        //                 ))}
        //             </tbody>
        //         </table>
        //     </form>




        // </div>

    )


};

export default CarsHugPost