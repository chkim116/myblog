import React from "react";
import ReactPaginate from "react-paginate";

export const PostPagination = ({ handleChange, postLength, select }) => {
  return (
    <>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={postLength}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handleChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        pageClassName={"page-btn"}
        activeClassName={"active"}
        forcePage={select}
      ></ReactPaginate>
    </>
  );
};
