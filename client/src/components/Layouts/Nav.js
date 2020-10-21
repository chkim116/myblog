import React, { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";
import { NavMenu } from "./NavMenu";

const Nav = ({ onClick, onChange }) => {
  const menu = useRef();
  const onClickNav = useCallback(() => {
    menu.current.classList.toggle("active");
  }, [menu]);

  return (
    <div className='wrap__header'>
      <header onChange={onChange}>
        <li>
          <Link to={routes.home} className='header__logo'>
            Think_Tank
          </Link>
        </li>
        <NavMenu menu={menu} onClickNav={onClickNav} onClick={onClick} />
        <li className='header__hamburger' onClick={onClickNav}>
          <GiHamburgerMenu />
        </li>
      </header>
    </div>
  );
};

export default Nav;
