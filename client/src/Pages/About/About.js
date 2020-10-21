import React from "react";
import { Helmet } from "react-helmet-async";
import AboutForm from "../../components/About/AboutForm";

const About = () => {
  return (
    <>
      <Helmet>
        <title>My Blog | About</title>
      </Helmet>
      <AboutForm />
    </>
  );
};

export default About;
