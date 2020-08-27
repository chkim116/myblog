import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";

const Nav = ({ width }) => {
  return (
    <>
      <header>
        <li>
          <Link to={routes.home} className="header__logo">
            Think_Tank
          </Link>
        </li>
        <div className="header__menu">
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
        </div>
        <li className="header__hamburger">
          {width < 768 && <GiHamburgerMenu />}
        </li>
      </header>
    </>
  );
};

export default Nav;