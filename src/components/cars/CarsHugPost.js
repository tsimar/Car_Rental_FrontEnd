import React, { useState } from 'react';
import './Cars.css';

const CarsHugPost = ({ post/*, loading */ }) => {
    const [colorClass, setColorClass] = useState("user-add");
    console.log(post);
    // if (loading) {
    //     return <h2>Loading...</h2>;
    // }

    return (
        // <ul className='list-group mb-4'>
        //     {posts.map(post => (
        //         <li key={post.id} className='list-group-item'>
        //             {post.id} 

        //         </li>
        //     ))}
        // </ul>
        <tr border={"2"} className="user" key={post.id} >
            <td width={"50"}>{post.id}</td>
            <td width={"50"}>{post.carBrand}</td>
            <td width={"50"}>{post.model}</td>
            <td width={"50"}>{post.carType}</td>
            <td width={"50"}>{post.productionDate}</td>
            <td width={"50"}>{post.color}</td>
            <td width={"50"}>{post.carMileage}</td>
            <td width={"50"}>{post.statusRental}</td>
            <td width={"50"}>{post.carStatus}</td>
            <td>
                <button type="button">
                    {/* onClick={(event) => handleEditClick(event, item)}> */}
                    Edit
                </button>
                <button type="button" >
                    {/* onClick={()=>handleDeleteClick(item.id)}>  */}
                    Delete
                </button>
            </td>
        </tr >

    )
     
    
};

export default CarsHugPost