import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showSearchBar } from "../../Modules/search";
import "./SearchingBar.scss";
import { SearchingBarForm } from "./SearchingBarForm";

export const SearchingBar = ({ onClick, history }) => {
    const [search, setSearch] = useState({
        select: "title",
        text: "",
    });

    const dispatch = useDispatch();

    const onChange = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setSearch({ select: "title", text: "" });
        dispatch(showSearchBar(false));
        history.push(`/search?select=${search.select}&text=${search.text}`);
    };

    return (
        <SearchingBarForm
            onClick={onClick}
            onSubmit={onSubmit}
            search={search}
            onChange={onChange}
        />
    );
};
