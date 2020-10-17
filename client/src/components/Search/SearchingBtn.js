import React from "react";
import { SearchingBar } from "./SearchingBar";
import { HiSearch } from "react-icons/hi";
import "./SearchingBtn.scss";
import { useDispatch, useSelector } from "react-redux";
import { showSearchBar } from "../../Modules/search";

export const SearchingBtn = ({ history }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.search.show);
  const onClick = () => {
    !show ? dispatch(showSearchBar(true)) : dispatch(showSearchBar(false));
  };

  return (
    <>
      <button onClick={onClick} className='search-btn' type='button'>
        <HiSearch size={32} color='#fdfdfd' />
      </button>
      <SearchingBar onClick={onClick} history={history} />
    </>
  );
};
