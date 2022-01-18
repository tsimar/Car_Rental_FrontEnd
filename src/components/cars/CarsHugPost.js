import React, { useState } from "react";
import "./Cars.css";

const CarsHugPost = ({ posts }) => {
  const [colorClass, setColorClass] = useState("user-add");
  console.log(posts);
  // if (loading) {
  //     return <h2>Loading...</h2>;
  // }

  return posts.map((post) => (
    <tr border={"2"} key={post.id}>
      <td width={"50"}>{post.id}</td>
      <td width={"200"}>{post.model}</td>
      <td>
        <button type="button">
          {/* onClick={(event) => handleEditClick(event, item)}> */}
          Edit
        </button>
        <button type="button">
          {/* onClick={()=>handleDeleteClick(item.id)}>  */}
          Delete
        </button>
      </td>
    </tr>
  ));
  /* </tbody>
                </table>
            </form> */
};

export default CarsHugPost;
