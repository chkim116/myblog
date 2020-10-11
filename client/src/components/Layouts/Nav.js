import React from "react";
import { Link } from "react-router-dom";
import routes from "../../routes";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Nav.scss";

const NavList = ({ link, onClicknav, menu }) => {
  return (
    <Link to={link} className='menu__items' onClick={onClicknav}>
      <li>{menu}</li>
    </Link>
  );
};

const Nav = ({ userId, onClick, onChange, admin }) => {
  const { username } = userId;
  const onClickNav = () => {
    const menu = document.querySelector(".header__menu");
    menu.classList.toggle("active");
  };

  return (
    <>
      <header onChange={onChange}>
        <li>
          <Link to={routes.home} className='header__logo'>
            Think_Tank
          </Link>
        </li>
        <nav className='header__menu'>
          <NavList link={routes.home} onClickNav={onClickNav} menu='홈' />
          <NavList link={routes.post} onClickNav={onClickNav} menu='포스트' />
          <NavList
            link={routes.guestbook}
            onClickNav={onClickNav}
            menu='방명록'
          />
          <NavList link={routes.about} onClickNav={onClickNav} menu='어바웃' />

          {!username ? (
            <>
              <NavList
                link={routes.login}
                onClickNav={onClickNav}
                menu='로그인'
              />
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
        <li className='header__hamburger' onClick={onClickNav}>
          <GiHamburgerMenu />
        </li>
      </header>
    </>
  );
};

export default Nav;
