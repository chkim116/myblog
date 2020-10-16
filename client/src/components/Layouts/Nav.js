import React, { useState } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";
import { SearchingBar } from "../Search/SearchingBar";
import { NavMenu } from "./NavMenu";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { searchingPost } from "../../Redux/search";

const Nav = ({ onClick, onChange }) => {
  const onClickNav = () => {
    const menu = document.querySelector(".header__menu");
    menu.classList.toggle("active");
  };

  const sele = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    select: "all",
    text: "",
  });
  const { select, text } = search;

  const onSearch = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
    dispatch(searchingPost(select, text));
  };

  console.log(sele);
  return (
    <>
      <header onChange={onChange}>
        <li>
          <Link to={routes.home} className='header__logo'>
            Think_Tank
          </Link>
        </li>
        <NavMenu onClickNav={onClickNav} onClick={onClick} />
        <li className='header__hamburger' onClick={onClickNav}>
          <GiHamburgerMenu />
        </li>
      </header>
      <SearchingBar onSearch={onSearch} />
    </>
  );
};

export default Nav;
