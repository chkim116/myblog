import React from "react";
import ReactPaginate from "react-paginate";

export const PostPagination = ({ handleChange, select, lastPage }) => {
    return (
        <>
            <ReactPaginate
                previousLabel={"이전"}
                nextLabel={"다음"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={lastPage}
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
