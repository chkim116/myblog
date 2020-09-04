import React from "react";
import ReactPaginate from "react-paginate";

export const PostPagination = ({ handleChange, page, postLength }) => {
  return (
    <>
      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={postLength}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handleChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      ></ReactPaginate>
    </>
  );
};
