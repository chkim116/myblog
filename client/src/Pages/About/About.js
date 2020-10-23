import React from "react";
import { Helmet } from "react-helmet-async";
import AboutForm from "../../components/About/AboutForm";

const About = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

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
