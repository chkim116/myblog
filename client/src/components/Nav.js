import React from "react";
import { Link } from "react-router-dom";
import routes from "../routes";
import "../assets/scss/header.scss";

const Nav = () => {
  return (
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

        <li className="header__hamburger">only media</li>
      </div>
    </header>
  );
};

export default Nav;
