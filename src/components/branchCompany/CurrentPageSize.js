import React from "react";

const CurrentPageSize = ({ currentPage,PageSize,posts }) => {
     let indexOfLastPost = currentPage * PageSize;
     if (posts.length <= indexOfLastPost - PageSize) {
       indexOfLastPost = (currentPage - 1) * PageSize;
     }
     const indexOfFirstPost = indexOfLastPost - PageSize;
     const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  return {
  currentPosts


  };
};
export default CurrentPageSize;