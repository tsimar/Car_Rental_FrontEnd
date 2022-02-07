import React from 'react';

const BranchCompanyPage = ({ postsPerPage, totalPosts,paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number}  onClick={() => paginate(number)}className='page-item'>
            {/* <a href='${number}' className='page-link'>
             
            </a>  */}
            {number}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BranchCompanyPage;