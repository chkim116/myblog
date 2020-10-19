import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

export const PostPagination = ({ handleChange, select }) => {
  const post = useSelector((state) => state.search.post);
  const filter = useSelector((state) => state.category.filter);
  const filterPost = filter && post.filter((f) => f.category === filter);
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
            : Math.ceil(filterPost.length / 6)
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
