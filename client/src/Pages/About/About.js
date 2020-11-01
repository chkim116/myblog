import React from "react";
import AboutForm from "../../components/About/AboutForm";
import { SeoMeta } from "../../SeoMeta";

const About = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const data = {
    title: "About | Think_Thank",
    description: "내가 생각하는 창고, Think Tank",
    canonical: `about`,
  };

  return (
    <>
      <SeoMeta data={data} />
      <AboutForm />
    </>
  );
};

export default About;
