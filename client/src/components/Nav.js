import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";

const Nav = ({ width, userId, onClick }) => {
  const { username } = userId;
  return (
    <>
      <header>
        <li>
          <Link to={routes.home} className="header__logo">
            Think_Tank
          </Link>
        </li>
        <nav className="header__menu">
          <li>
            <Link to={routes.home}>Home</Link>
          </li>
          <li>
            <Link to={routes.portfolio}>Portfolio</Link>
          </li>
          <li>
            <Link to={routes.post}>Post</Link>
          </li>
          <li>
            <Link to={routes.about}>About Me</Link>
          </li>
          {!userId ? (
            <>
              <li>
                <Link to={routes.login}>Login</Link>
              </li>
              <li>
                <Link to={routes.register}>Register</Link>
              </li>
            </>
          ) : (
            <>
              <li className="logout" onClick={onClick}>
                Logout
              </li>
              <li>{username}님 어서오세요</li>
            </>
          )}
        </nav>
        {width < 768 && (
          <li className="header__hamburger">
            <GiHamburgerMenu />
          </li>
        )}
      </header>
    </>
  );
};

export default Nav;
