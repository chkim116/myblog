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

const AboutForm = () => {
  return (
    <>
      <div className="about">
        <h1>For Web & Mobile</h1>
        <h4>Out mission is to Design and develop the Best!</h4>
      </div>
      <div className="about__desc">
        <h1>About Me </h1>
        <div className="about__icons">
          <div className="about__stack">
            <h5>Stack</h5>
            <SiHtml5 className="about__stack-icon" />
            <SiCss3 className="about__stack-icon" />
            <SiJavascript className="about__stack-icon" />
            <FaNodeJs className="about__stack-icon" />
          </div>
          <h5>Library Stack</h5>
          <div className="about__stack-library">
            <SiReact className="about__stack-icon" />
          </div>
          <h5>Framwork Stack</h5>
          <div className="about__stack-frame">
            <FaSass className="about__stack-icon" />
          </div>
          <h5>Utilites Stack</h5>
          <div className="about__stack-util">
            <SiBabel className="about__stack-icon" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutForm;
