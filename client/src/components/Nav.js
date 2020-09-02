import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";

const Nav = ({ width, user, onClick }) => {
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
          {!user ? (
            <>
              <li>
                <Link to={routes.login}>Login</Link>
              </li>
              <li>
                <Link to={routes.register}>Register</Link>
              </li>
            </>
          ) : (
            <li className="logout" onClick={onClick}>
              Logout
            </li>
          )}
        </nav>
        <li className="header__hamburger">
          {width < 768 && <GiHamburgerMenu />}
        </li>
      </header>
    </>
  );
};

export default Nav;
