import React,{useState,useEffect} from "react";
import axios from "axios";
import Pagination from "../Page/Pagination";

const api = axios.create({ baseURL: "http://localhost:8080/branchCompany" });
// const apiCar = axios.create({ baseURL: "http://localhost:8080/cars" });
let addCompanyId = null;

const RentalCar =()=>{

const [posts,setPosts]=useState([]);
const [currentPage, setCurrentPage] = useState(1);
const [PageSize] = useState(5);
const [loading, setLoading] = useState(false);


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
let indexOfLastPost = currentPage * PageSize;
if (posts.length <= indexOfLastPost - PageSize) {
  indexOfLastPost = (currentPage - 1) * PageSize;
}
const indexOfFirstPost = indexOfLastPost - PageSize;
const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
const paginate = (pageNumber) => setCurrentPage(pageNumber); 
 const renderIncomingData = (data) => {
   // if (loading) {
   //   return <h2>Loading...</h2>;
   // }
   console.log("data render in coming= ", data);

   return data.map((item) => {
     return (
       <tr
         border={"2"}
         className={"user-tab"}
         key={item.id}
         //    onClick={(event) => handleVisibleCompClick(event, item.id)}
       >
         <td width={"auto"}>{item.id}</td>
         <td width={"auto"}>{item.logo}</td>
         <td width={"auto"}>{item.nameRental}</td>
         <td width={"auto"}>{item.city}</td>
         <td width={"auto"}>{item.address}</td>
       </tr>
     );
   });
 };
return (
  <div>
    <div className="h1-tabl-page">
      <h1 className="text-primary ">DEPARTMENT</h1>

      <div className="form-table-comp">
        <form>
          <table className={"comp-main-tab"}>
            <thead>
              <tr>
                <th width={"auto"}>ID:</th>
                <th width={"auto"}>Logo:</th>
                <th width={"auto"}>department:</th>
                <th width={"auto"}>city:</th>
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
  </div>
);
}
export default RentalCar;