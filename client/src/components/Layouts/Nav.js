import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";
import { NavMenu } from "./NavMenu";

const Nav = ({ onClick, onChange }) => {
  const onClickNav = () => {
    const menu = document.querySelector(".header__menu");
    menu.classList.toggle("active");
  };

  return (
    <div className='wrap__header'>
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
    </div>
  );
};

export default Nav;
