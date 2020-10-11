import React from "react";
import "./HomeForm.scss";
import img from "../../image/1.jpg";
import { Link } from "react-router-dom";
import { SiReact } from "react-icons/si";
import { FaNodeJs, FaSass } from "react-icons/fa";

const HomeForm = () => {
  return (
    <>
      <div className='main'>
        <img src={img} alt='home' />
        <h1 className='home__title'>Create New EveryDay</h1>
        <p className='home__desc'>
          There have to be reasons that you get up in the morning and you want
          to live.
        </p>
        <button>
          <Link to='https://github.com/chkim116' target='blank'>
            View More My GitHub
          </Link>
        </button>
        <button>
          <Link to='https://blog.naver.com/dudnqnfqlc'>Blog</Link>
        </button>
        <div>이 사이트는</div>
        <div>
          <SiReact className='about__stack-icon react' />
          <FaNodeJs className='about__stack-icon node' />
          <FaSass className='about__stack-icon sass' />
        </div>
        <div>로 만들어졌습니다.</div>
      </div>
    </>
  );
};

export default HomeForm;
