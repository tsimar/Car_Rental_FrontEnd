import React, { useState, useEffect } from "react";
import { url } from "../../url";
import axios from "axios";
import Pagination from "../Page/Pagination";

import "../style/reset.css";
import "../style/table.css";
import "../style/inputAdd.css";

const apiRental = axios.create({ baseURL: `${url}/rentals` });

const RentalCar = ({ addCompanyId, addUserId }) => {
  const [postsRental, setPostsRental] = useState([]);

  const [currentPageRental, setCurrentPageRental] = useState(1);
  const [PageSize] = useState(5);

  const [loadingRental, setLoadingRental] = useState(false);

  const fetchDataRental = async () => {
    const getRental = apiRental.get(`/${addCompanyId}/${addUserId}`);

    axios.all([getRental]).then(
      axios.spread((...allData) => {
        setLoadingRental(true);
        const getRentalAll = allData[0];
        // const allDataComp = allData[1]
        console.log("getRentalAll" + getRentalAll);
        setPostsRental(getRentalAll.data);
        setLoadingRental(false);
      })
    );
  };

  useEffect(() => {
    if (addCompanyId > 0 && addUserId > 0) {
      fetchDataRental();
    }
  }, [addCompanyId, addUserId]);

  // Get current postsRental
  let indexOfLastPostRental = currentPageRental * PageSize;
  if (postsRental.length <= indexOfLastPostRental - PageSize) {
    indexOfLastPostRental = Math.ceil(postsRental.length / PageSize) * PageSize;
  }
  const indexOfFirstPostRental = indexOfLastPostRental - PageSize;
  const currentPostsRental = postsRental.slice(
    indexOfFirstPostRental,
    indexOfLastPostRental
  );
  // Change page
  const paginateRental = (pageNumber) => setCurrentPageRental(pageNumber);

  const handleGetRental = (data) => {
    console.log("rental", postsRental);

    return data.map((item) => {
      return (
        <tr className="tab--tr" key={item.id}>
          <td className="tab--td">{item.id}</td>
          <td className="tab--td">{item.rentalDate}</td>
          <td className="tab--td">{item.commentsRental}</td>
          <td className="tab--td">{item.commentsCustomer}</td>
          <td className="tab--td">{item.userId}</td>
        </tr>
      );
    });
  };
  const tableRental = () => {
    if (loadingRental) {
      return <h2>Loading lists rental...</h2>;
    }
    return (
      <React.Fragment>
        <h1 className="text-primary ">Rental</h1>
        <form>
          <table className="tab">
            <thead className="tab--thead">
              <tr className="tab--tr">
                <th className="tab__thead--th">ID:</th>
                <th className="tab__thead--th">rental date:</th>
                <th className="tab__thead--th">comment rental:</th>
                <th className="tab__thead--th">comment customer:</th>
                <th className="tab__thead--th">id user:</th>
              </tr>
            </thead>
            <tbody>{handleGetRental(currentPostsRental)}</tbody>
          </table>
        </form>
        <Pagination
          postsPerPage={PageSize}
          totalPosts={postsRental.length}
          paginate={paginateRental}
        />
      </React.Fragment>
    );
  };

  return (
    <div>
      <section className="car-tabl">
        <div>{tableRental()}</div>
      </section>
    </div>
  );
};
export default RentalCar;
