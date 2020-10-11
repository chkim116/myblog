import React from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>My Blog | Not Found</title>
      </Helmet>
      <h1 className='error__title'>Not Found!</h1>
    </>
  );
};

export default NotFound;
