import React from "react";
import ReactPaginate from "react-paginate";

export const PostPagination = ({
  handleChange,
  select,
  filter,
  post,
  filteringPost,
}) => {
  return (
    <>
      <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={
          !filter
            ? Math.ceil(post.length / 6)
            : Math.ceil(filteringPost.length / 6)
        }
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handleChange}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        pageClassName={"page-btn"}
        activeClassName={"active"}
        forcePage={select || 0}></ReactPaginate>
    </>
  );
};
