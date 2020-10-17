import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  searchingPost,
  searchResults,
  showSearchBar,
} from "../../Modules/search";
import { Loading } from "../../Pages/Etc/Loading";
import "./SearchingBar.scss";

export const SearchingBar = ({ onClick, history }) => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState({
    select: "title",
    text: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
    dispatch(searchingPost(search.select, search.text));
  };

  const getSearching = () => {
    const searchPost = async () => {
      setLoading(true);
      await Axios.get("/api/all").then((res) =>
        dispatch(searchResults(res.data))
      );
      setLoading(false);
    };
    searchPost();
  };

  useEffect(() => {
    getSearching();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(showSearchBar(false));
    history.push(`/search?select=${search.select}&text=${search.text}`);
  };

  return (
    <>
      {loading && <Loading />}
      <div className='searchingbar'>
        <form
          className='searchingbar__form'
          onChange={onChange}
          onSubmit={onSubmit}>
          <span className='searchingbar-del' onClick={onClick}>
            X
          </span>
          <select className='searchingbar-select' name='select'>
            <option value='title'>제목</option>
            <option value='description'>본문</option>
            <option value='tags'>태그</option>
          </select>
          <input
            name='text'
            className='searchingbar-input'
            type='text'
            placeholder='검색어를 입력하세요'
          />
          <button className='searchingbar-btn' type='submit'>
            검색
          </button>
        </form>
      </div>
    </>
  );
};
