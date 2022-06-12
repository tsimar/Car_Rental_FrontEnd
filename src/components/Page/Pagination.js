import React from "react";
import "./Pagination.css";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
    console.log(pageNumbers);
  }

  return (
    <nav>
      <ul className="pagination-ul">
        {pageNumbers.map((number) => (
          <li key={number} onClick={() => paginate(number)} className="page-li">
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
