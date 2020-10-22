import React from "react";
import "./FooterForm.scss";

const year = new Date().getFullYear();

const FooterForm = ({ view }) => {
  return (
    <>
      <footer>
        <div>
          <h2> Think_Tank </h2>
          <div className='view__box'>
            <div className='view'>today:{view.views}</div>
            <div className='view'>total:{view.totalView}</div>
          </div>
          <small>Copyright ©{year}</small>
        </div>
      </footer>
    </>
  );
};

export default FooterForm;
