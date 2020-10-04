import React from "react";
import "./HomeForm.scss";
import img from "../image/1.jpg";
import { Link } from "react-router-dom";
import { SiReact } from "react-icons/si";
import { FaNodeJs, FaSass } from "react-icons/fa";

const HomeForm = () => {
  return (
    <>
      <div className="main">
        <img src={img} alt="home" />
        <h2 className="home__title">Create New EveryDay</h2>
        <h4 className="home__desc">
          There have to be reasons that you get up in the morning and you want
          to live.
        </h4>
        <button>
          <a href="https://github.com/chkim116" target="blank">
            View More My GitHub
          </a>
        </button>
        <button>
          <a href="https://blog.naver.com/dudnqnfqlc">Blog</a>
        </button>
        <h4>이 사이트는</h4>
        <div>
          <SiReact className="about__stack-icon react" />
          <FaNodeJs className="about__stack-icon node" />
          <FaSass className="about__stack-icon sass" />
        </div>
        <h4>로 만들어졌습니다.</h4>
      </div>
    </>
  );
};

export default HomeForm;
