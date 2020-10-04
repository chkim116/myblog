import React from "react";
import "./FooterForm.scss";

const year = new Date().getFullYear();

const FooterForm = () => {
  return (
    <footer>
      <div>
        <h2> Think_Tank </h2>
        <small>Copyright ©{year}</small>
      </div>
    </footer>
  );
};

export default FooterForm;
