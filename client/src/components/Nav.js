import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";

const Nav = ({ userId, onClick, width, onChange }) => {
  const { username } = userId;
  const onClickNav = () => {
    const menu = document.querySelector(".header__menu");
    menu.classList.toggle("active");
  };

  return (
    <>
      <header onChange={onChange}>
        <li>
          <Link to={routes.home} className="header__logo">
            Think_Tank
          </Link>
        </li>
        <nav className="header__menu">
          <li className="menu__items" onClick={onClickNav}>
            <Link to={routes.home}>Home</Link>
          </li>
          <li className="menu__items" onClick={onClickNav}>
            <Link to={routes.portfolio}>Portfolio</Link>
          </li>
          <li className="menu__items" onClick={onClickNav}>
            <Link to={routes.post}>Post</Link>
          </li>
          <li className="menu__items" onClick={onClickNav}>
            <Link to={routes.about}>About Me</Link>
          </li>
          {!username ? (
            <>
              <li className="menu__items" onClick={onClickNav}>
                <Link to={routes.login}>Login</Link>
              </li>
              <li className="menu__items" onClick={onClickNav}>
                <Link to={routes.register}>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className="menu__items" onClick={onClick}>
                Logout
              </li>
              <li className="username">{username}님 어서오세요</li>
            </>
          )}
        </nav>
        {768 >= width ? (
          <li className="header__hamburger" onClick={onClickNav}>
            <GiHamburgerMenu />
          </li>
        ) : (
          <> </>
        )}
      </header>
    </>
  );
};

export default Nav;
