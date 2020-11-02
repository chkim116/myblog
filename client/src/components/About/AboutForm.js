import React from "react";
import "./AboutForm.scss";
import { SiReact } from "react-icons/si";
import { FaNodeJs } from "react-icons/fa";
import about from "../../image/about.jpg";

const AboutForm = () => {
  return (
    <div className='about'>
      <div className='about__introduce'>
        <div className='about__introduce-text'>
          This site consists of React and Node js.
        </div>

        <div className='about__introduce-desc'>
          <div className='about__introduce-img'>
            <img src={about} alt='얼굴사진' />
          </div>
        </div>
      </div>

      <div className='contact'>
        <div className='contact-btn'>Contact Me</div>
        <div>
          <a
            href='https://portffollio.netlify.app/'
            target='blank'
            className='contact-link'>
            PORTFOLIO
          </a>
          <a
            href='https://www.instagram.com/kor_melon/'
            target='blank'
            className='contact-link'>
            INSTARGRAM
          </a>
        </div>
      </div>

      <div className='about__stack'>
        <div className='about__stack-desc'>
          <div className='about__stack-react'>
            <ul className='list'>
              <li className='list-items'>React</li>
              <li className='list-items'>React Hooks</li>
              <li className='list-items'>React Redux</li>
            </ul>
            <div className='about__stack-icon'>
              <SiReact className='react' size={48} />
            </div>
          </div>
          <div className='about__stack-node'>
            <ul className='list'>
              <li className='list-items'>Express</li>
              <li className='list-items'>Mongoose</li>
              <li className='list-items'>Jwt</li>
            </ul>
            <div className='about__stack-icon'>
              <FaNodeJs className='node' size={48} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutForm;
