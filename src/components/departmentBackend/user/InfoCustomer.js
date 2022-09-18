import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Page/Pagination";
import { url } from "../../../url";
import "../../../style/reset.css";

import "../../../style/table.css";
import "../../../style/inputAdd.css";

const apiCustomer = axios.create({ baseURL: `${url}/customer` });

const InfoCustomer = ({ addUserId }) => {
  const [postsCustomer, setPostsCustomer] = useState([]);
  const [currentPageCustomer, setCurrentPageCustomer] = useState(1);
  const [PageSize] = useState(5);
  const [loadingCustomer, setLoadingCustomer] = useState(false);


  useEffect(() => {
    if (addUserId > 0) {
      async function fetchDataCustomer() {
        const getCustomer = await apiCustomer.get(`/${addUserId}`);

        axios.all([getCustomer]).then(
          axios.spread((...allData) => {
            setLoadingCustomer(true);
            const getCustomerAll = allData[0];
            console.log("getCustomerAll", getCustomerAll);
            setPostsCustomer(getCustomerAll.data);
            setLoadingCustomer(false);
          })
        );
      }
      fetchDataCustomer();
    }
  }, [addUserId]);

  // Get current postsCustomer
  let indexOfLastPostCustomer = currentPageCustomer * PageSize;
  if (postsCustomer.length <= indexOfLastPostCustomer - PageSize) {
    indexOfLastPostCustomer =
      Math.ceil(postsCustomer.length / PageSize) * PageSize;
  }
  const indexOfFirstPostCustomer = indexOfLastPostCustomer - PageSize;
  const currentPostsCustomer = postsCustomer.slice(
    indexOfFirstPostCustomer,
    indexOfLastPostCustomer
  );
  // Change page
  const paginateCustomer = (pageNumber) => setCurrentPageCustomer(pageNumber);

  const handleGetCustomer = (data) => {
    return data.map((item) => {
      return (
        <tr className="tab--tr" key={item.id}>
          <td className="tab--td">{item.id}</td>
          <td className="tab--td">{item.returnDate}</td>
          <td className="tab--td">{item.commentsReturn}</td>
          <td className="tab--td">{item.commentsCustomer}</td>
          <td className="tab--td">{item.supplement}</td>
          <td className="tab--td">{item.userId}</td>
          <td className="tab--td">{item.companyId}</td>
        </tr>
      );
    });
  };
  const tableCustomer = () => {
    if (loadingCustomer) {
      return <h2>Loading lists customer...</h2>;
    }
    return (
      <React.Fragment>
        <h1 className="text-primary ">Customer</h1>
        <form>
          <table className="tab">
            <thead className="tab--thead">
              <tr className="tab--tr">
                <th className="tab__thead--th">ID:</th>
                <th className="tab__thead--th">name :</th>
                <th className="tab__thead--th">last name:</th>
                <th className="tab__thead--th">email:</th>
                <th className="tab__thead--th">address:</th>
                <th className="tab__thead--th">id user:</th>
              </tr>
            </thead>
            <tfoot className="tab--tfoot">
              <tr>
                <td colSpan="11" className="tab__tfoot--td">
                  <div className="container__page--div">
                    <Pagination
                      postsPerPage={PageSize}
                      totalPosts={postsCustomer.length}
                      paginate={paginateCustomer}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>{handleGetCustomer(currentPostsCustomer)}</tbody>
          </table>
        </form>
      </React.Fragment>
    );
  };

  return (
    <div>
      <section className="car-tabl">
        <div>{tableCustomer()}</div>
      </section>
    </div>
  );
};
export default InfoCustomer;
