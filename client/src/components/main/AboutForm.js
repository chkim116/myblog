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

const AboutForm = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    autoplay: true,
    autoplaySpeed: 4500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
            <SiHtml5 className="about__stack-icon html" />
            <SiCss3 className="about__stack-icon css" />
            <SiJavascript className="about__stack-icon js" />
            <FaNodeJs className="about__stack-icon node" />
          </div>
          <h5>Library Stack</h5>
          <div className="about__stack-library">
            <SiReact className="about__stack-icon react" />
          </div>
          <h5>Framwork Stack</h5>
          <div className="about__stack-frame">
            <FaSass className="about__stack-icon sass" />
          </div>
          <h5>Utilities Stack</h5>
          <div className="about__stack-util">
            <SiBabel className="about__stack-icon babel" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutForm;
