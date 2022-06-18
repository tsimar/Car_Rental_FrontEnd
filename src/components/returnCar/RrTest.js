import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Page/Pagination";
const apiReturn = axios.create({ baseURL: "http://localhost:8080/return" });

const RrTest = ({ addCompanyId, addUserId }) => {
  const [postsReturn, setPostsReturn] = useState([]);
  const [loadingReturn, setLoadingReturn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageReturn, setCurrentPageReturn] = useState(1);
  const [PageSize] = useState(5);
  let idCompany = Object.values(addCompanyId)[0];
  //   let idUser = Object.values(addUserId)[0];
  const fetchDataReturn = async () => {
    const getReturn = await apiReturn.get(`/${addCompanyId}/${addUserId}`);

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
    // console.log(idCompany !== 0 && idUser > 0);
    if (idCompany !== 0) {
      fetchDataReturn();
    }
  }, [addUserId]);

  const indexOfLastPostReturn = currentPageReturn * PageSize;

  const indexOfFirstPostReturn = indexOfLastPostReturn - PageSize;
  const currentPostsReturn = postsReturn.slice(
    indexOfFirstPostReturn,
    indexOfLastPostReturn
  );
  // Change page
  const paginateReturn = (pageNumber) => setCurrentPageReturn(pageNumber);
  const handleGetReturn = (data) => {
    console.log("return", postsReturn);

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
                <td colspan="11" className="tab__tfoot--td">
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
      <section className="car-tabl">
        <div>{tableReturn()}</div>
      </section>
    </div>
  );
};
export default RrTest;
