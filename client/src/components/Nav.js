import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";

const Nav = ({ userId, onClick, width, onChange, admin }) => {
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
          <Link to={routes.home} className="menu__items" onClick={onClickNav}>
            <li>Home</li>
          </Link>
          <Link
            to={routes.portfolio}
            className="menu__items"
            onClick={onClickNav}
          >
            <li>Portfolio</li>
          </Link>
          <Link to={routes.post} className="menu__items" onClick={onClickNav}>
            <li>Post</li>
          </Link>
          <Link to={routes.about} className="menu__items" onClick={onClickNav}>
            <li>About Me</li>
          </Link>
          {!username ? (
            <>
              <Link
                to={routes.login}
                className="menu__items"
                onClick={onClickNav}
              >
                <li>Login</li>
              </Link>
              <Link
                to={routes.register}
                className="menu__items"
                onClick={onClickNav}
              >
                <li>Register</li>
              </Link>
            </>
          ) : (
            <>
              <li className="menu__items" onClick={onClick}>
                Logout
              </li>
              {!admin ? (
                <li className="username">{username}님 어서오세요</li>
              ) : (
                <li className="username">
                  관리자님 어서오세요 아이디는 {username}입니다.
                </li>
              )}
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
