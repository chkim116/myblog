/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./AboutForm.scss";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiBabel,
} from "react-icons/si";
import { FaNodeJs, FaSass } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactTooltip from "react-tooltip";

const Arrow = () => {
  return <> </>;
};

const AboutForm = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
  };

  return (
    <>
      <Slider {...settings} className="about">
        <div className="slide__one">
          <h1>For Web & Mobile</h1>
          <h3>Our mission is to Design and develop the Best!</h3>
        </div>
        <div className="slide__two">
          <h1>Not Afraid</h1>
          <h3>Every day new, Every day Different Tech</h3>
        </div>
        <div className="slide__three">
          <h1>Serendipity</h1>
          <h3>New Creation, Unexpected Discovery</h3>
        </div>
      </Slider>

      <div className="about__desc">
        <h1>About Me </h1>
        <div className="about__icons">
          <div className="about__stack">
            <h5>Stack</h5>

            <a data-tip data-for="html">
              <SiHtml5 className="about__stack-icon html" />
            </a>
            <ReactTooltip id="html" place="left" effect="float">
              <h2>HTML</h2>
              <ul>
                <li>시맨틱 태그에 대한 이해</li>
                <li>Canvas 등 다양한 태그 경험</li>
              </ul>
            </ReactTooltip>

            <a data-tip data-for="css">
              <SiCss3 className="about__stack-icon css" />
            </a>
            <ReactTooltip id="css" place="top" effect="float">
              <h2>CSS</h2>
              <ul>
                <li>라이브러리 없는 CSS 활용</li>
                <li>flex, grid의 박스 모델</li>
                <li>애니메이션, 트렌지션 기능</li>
                <li>미디어 쿼리</li>
              </ul>
            </ReactTooltip>

            <a data-tip data-for="js">
              <SiJavascript className="about__stack-icon js" />
            </a>
            <ReactTooltip id="js" place="top" effect="float">
              <h2>JAVASCRIPT</h2>
              <ul>
                <li>Vanila JS 활용</li>
                <li>DOM 요소</li>
                <li>ES6 문법 숙지</li>
                <li>로컬스토리지</li>
              </ul>
            </ReactTooltip>

            <a data-tip data-for="node">
              <FaNodeJs className="about__stack-icon node" />
            </a>
            <ReactTooltip id="node" place="top" effect="float">
              <h2>NODE JS</h2>
              <ul>
                <li>REST API</li>
                <li>CRUD 구현</li>
                <li>뷰 템플릿 엔진 PUG</li>
                <li>REACT 연동</li>
                <li>몽고DB 연동</li>
              </ul>
            </ReactTooltip>
          </div>

          <h5>Library Stack</h5>
          <div className="about__stack-library">
            <a data-tip data-for="react">
              <SiReact className="about__stack-icon react" />
            </a>
            <ReactTooltip id="react" place="top" effect="float">
              <h2>REACT</h2>
              <ul>
                <li>리액트 훅 등 함수형 컴포넌트 기능 숙지</li>
                <li>클래스형 컴포넌트에 대한 이해</li>
                <li>AXIOS 등을 활용한 AJAX</li>
                <li>NODE JS 연동</li>
              </ul>
            </ReactTooltip>
          </div>

          <h5>Framwork Stack</h5>
          <div className="about__stack-frame">
            <a data-tip data-for="sass">
              <FaSass className="about__stack-icon sass" data-set="sass" />
            </a>
            <ReactTooltip id="sass" place="top" effect="float">
              <h2>SASS</h2>
              <ul>
                <li>REACT에서 활용</li>
                <li>NODE JS-PUG에서 활용</li>
              </ul>
            </ReactTooltip>
          </div>
          <h5>Utilities Stack</h5>
          <div className="about__stack-util">
            <a data-tip data-for="babel">
              <SiBabel className="about__stack-icon babel" data-set="babel" />
            </a>
            <ReactTooltip id="babel" place="top" effect="float">
              <h2>BABEL</h2>
              <ul>
                <li>바벨 설정</li>
                <li>최신 문법 사용</li>
              </ul>
            </ReactTooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutForm;
