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
        <h3>Out mission is to Design and develop the Best!</h3>
      </div>
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
          <h5>Utilites Stack</h5>
          <div className="about__stack-util">
            <SiBabel className="about__stack-icon babel" />
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutForm;
