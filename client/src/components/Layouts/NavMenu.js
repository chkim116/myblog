import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import routes from "../../routes";

const NavList = ({ link, onClickNav, menu }) => {
  return (
    <Link to={link} className='menu__items'>
      <li onClick={onClickNav}>{menu}</li>
    </Link>
  );
};

export const NavMenu = ({ onClickNav, onClick, menu }) => {
  const auth = useSelector((state) => state.auth);
  const { username, admin } = auth;

  return (
    <nav className='header__menu' ref={menu}>
      <NavList link={routes.home} onClickNav={onClickNav} menu='Home' />
      <NavList link={routes.post} onClickNav={onClickNav} menu='Post' />
      <NavList
        link={routes.guestbook}
        onClickNav={onClickNav}
        menu='GuestBook'
      />
      <NavList link={routes.about} onClickNav={onClickNav} menu='About' />

      {!username ? (
        <>
          <NavList link={routes.login} onClickNav={onClickNav} menu='Sign in' />
          <NavList
            link={routes.register}
            onClickNav={onClickNav}
            menu='Sign Up'
          />
        </>
      ) : (
        <>
          <li className='menu__items' onClick={onClick}>
            Logout
          </li>
          {!admin ? (
            <li className='username'>{username}</li>
          ) : (
            <li className='username'>{username} 관리자님 어서오세요</li>
          )}
        </>
      )}
    </nav>
  );
};
