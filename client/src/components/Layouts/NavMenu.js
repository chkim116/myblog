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

export const NavMenu = ({ onClickNav, onClick }) => {
  const auth = useSelector((state) => state.auth);
  const { username, admin } = auth;

  return (
    <nav className='header__menu'>
      <NavList link={routes.home} onClickNav={onClickNav} menu='홈' />
      <NavList link={routes.post} onClickNav={onClickNav} menu='포스트' />
      <NavList link={routes.guestbook} onClickNav={onClickNav} menu='방명록' />
      <NavList link={routes.about} onClickNav={onClickNav} menu='어바웃' />

      {!username ? (
        <>
          <NavList link={routes.login} onClickNav={onClickNav} menu='로그인' />
          <NavList
            link={routes.register}
            onClickNav={onClickNav}
            menu='회원가입'
          />
        </>
      ) : (
        <>
          <li className='menu__items' onClick={onClick}>
            로그아웃
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
