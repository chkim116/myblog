import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  searchingPost,
  searchResults,
  showSearchBar,
} from "../../Modules/search";
import "./SearchingBar.scss";
import { SearchingBarForm } from "./SearchingBarForm";

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
    setSearch({ select: "title", text: "" });
    dispatch(showSearchBar(false));
    history.push(`/search?select=${search.select}&text=${search.text}`);
  };

  return (
    <SearchingBarForm
      onClick={onClick}
      loading={loading}
      onSubmit={onSubmit}
      search={search}
      onChange={onChange}
    />
  );
};