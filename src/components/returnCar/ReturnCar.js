import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Page/Pagination";
import { url } from "../../url";
import "../style/reset.css";

import "../style/table.css";
import "../style/inputAdd.css";
import { useSelector } from "react-redux";

const apiReturn = axios.create({ baseURL: `${url}/return` });

const ReturnCar = ({ addUserId }) => {
  const idCompany = useSelector((state) => state.idComp.idComp);
  console.log("idComany", idCompany.title);

  const [postsReturn, setPostsReturn] = useState([]);
  const [currentPageReturn, setCurrentPageReturn] = useState(1);
  const [PageSize] = useState(5);
  const [loadingReturn, setLoadingReturn] = useState(false);

  const fetchDataReturn = async () => {
    const getReturn = await apiReturn.get(`/${idCompany.title}/${addUserId}`);

    axios.all([getReturn]).then(
      axios.spread((...allData) => {
        setLoadingReturn(true);
        const getReturnAll = allData[0];
        console.log("getReturnAll", getReturnAll);
        setPostsReturn(getReturnAll.data);
        setLoadingReturn(false);
      })
    );
  };
  useEffect(() => {
    if (idCompany.title > 0 && addUserId > 0) {
      fetchDataReturn();
    }
  }, [idCompany.title]);
  //  }, [addCompanyId, addUserId]);
  // Get current postsReturn
  let indexOfLastPostReturn = currentPageReturn * PageSize;
  if (postsReturn.length <= indexOfLastPostReturn - PageSize) {
    indexOfLastPostReturn = Math.ceil(postsReturn.length / PageSize) * PageSize;
  }
  const indexOfFirstPostReturn = indexOfLastPostReturn - PageSize;
  const currentPostsReturn = postsReturn.slice(
    indexOfFirstPostReturn,
    indexOfLastPostReturn
  );
  // Change page
  const paginateReturn = (pageNumber) => setCurrentPageReturn(pageNumber);

  const handleGetReturn = (data) => {
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
  const tableReturn = () => {
    if (loadingReturn) {
      return <h2>Loading lists return...</h2>;
    }
    return (
      <React.Fragment>
        <h1 className="text-primary ">Return</h1>
        <form>
          <table className="tab">
            <thead className="tab--thead">
              <tr className="tab--tr">
                <th className="tab__thead--th">ID:</th>
                <th className="tab__thead--th">return date:</th>
                <th className="tab__thead--th">comment return:</th>
                <th className="tab__thead--th">comment customer:</th>
                <th className="tab__thead--th">supplement:</th>
                <th className="tab__thead--th">id user:</th>
                <th className="tab__thead--th">id company:</th>
              </tr>
            </thead>
            <tfoot className="tab--tfoot">
              <tr>
                <td colSpan="11" className="tab__tfoot--td">
                  <div className="container__page--div">
                    <Pagination
                      postsPerPage={PageSize}
                      totalPosts={postsReturn.length}
                      paginate={paginateReturn}
                    />
                  </div>
                </td>
              </tr>
            </tfoot>
            <tbody>{handleGetReturn(currentPostsReturn)}</tbody>
          </table>
        </form>
      </React.Fragment>
    );
  };

  return (
    <div>
      <h1>{idCompany.title}</h1>
      <section className="car-tabl">
        <div>{tableReturn()}</div>
      </section>
    </div>
  );
};
export default ReturnCar;
