import React from "react";
import AboutForm from "../../components/main/AboutForm";
import FooterForm from "../../components/Layouts/FooterForm";
import { Helmet } from "react-helmet-async";

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
