import React from "react";
import { Helmet } from "react-helmet-async";
import AboutForm from "../../components/About/AboutForm";
import FooterForm from "../../components/Layouts/FooterForm";

const About = () => {
  return (
    <>
      <Helmet>
        <title>My Blog | About</title>
      </Helmet>
      <AboutForm />
      <FooterForm />
    </>
  );
};

export default About;
